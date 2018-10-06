const importResolver = require('./importresolver');

/** test quickly in astexplorer */
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = function transformer(file, api, options) {
    const j = api.jscodeshift;
    var paramNames = [];

    var getRequirePathByName = function (includeName, testfilePath) {
        return importResolver.resolveImportPath(
            testfilePath, 
            includeName, 
            options.includeObj, 
            options.includeRootPath);
    };

    function removeParams(path) {
        if (path.value.arguments[1].params && path.value.arguments[1].params.length) {
            paramNames = paramNames.concat(path.value.arguments[1].params.map(x => x.name));
        }
        path.value.arguments[1].params = [];
    }

    function getRequireDeclarationKind(jsource) {    
        try {
            let requireFind = jsource.find(j.VariableDeclarator, { init: { callee: { name: "require" } } });
            if (requireFind.length == 0) {
                return null;
            }

            let requirePath = requireFind.get(0);
            
            if (requirePath.node && requirePath.parentPath.parentPath.node) {
                return requirePath.parentPath.parentPath.node.kind;
            }
        } catch (err) {
            console.error(err);
            throw err;            
        }

        return null;
    };

    // transformation, remove params
    let srcWithoutParams = j(file.source)
        .find(j.CallExpression, { callee: { name: 'Scenario' } })
        .forEach(removeParams)
        .toSource();


    // transformation, add require 
    const createImportDeclarators = (imports) => {
        var declarators = [];

        // add 'include' dependencies declarations
        for (var imp of imports.filter(i => i != 'I')) {
            var commentNode = null;

            var requirePath = getRequirePathByName(imp, file.path);
            // add comment for declarations where require paths couldn't be found, and use 'include' name as require path.
            if (requirePath == null) {
                requirePath = imp;
                commentNode = j.commentBlock("todo: couldn't find require path for "+ imp +" using 'include' configuration")
            }

            var decl = j.variableDeclarator(
                j.identifier(imp),
                j.callExpression(j.identifier('require'), [j.literal(requirePath)])
            );

            if (commentNode != null) {
                if (!decl.comments) {
                    decl.comments = [];
                }

                decl.comments.unshift(commentNode);
            }
            
            declarators.push(decl);
        }

        // add actor declaration
        if (imports.some(i => i == 'I')) {
            const actorDeclarator = j.variableDeclarator(
                j.identifier("I"),
                j.callExpression(j.identifier('actor'), [])
            );
            declarators.unshift(actorDeclarator);
        }

        return declarators;
    };

    let missingImports = paramNames.filter(onlyUnique);
    
    let jWithoutParams = j(srcWithoutParams);

    // create imports
    const declarationKind = getRequireDeclarationKind(jWithoutParams) || "const";
    const createImportDeclaration = () => j.variableDeclaration(declarationKind, createImportDeclarators(missingImports));

    // add dependencies declaration
    if (missingImports && missingImports.length) {
        jWithoutParams.get().node.program.body.unshift(createImportDeclaration());
    }

    return jWithoutParams.toSource();
}