const path = require('path');

function resolveImportPath(testfilePath, includeName, includeObj, includeRootPath) {
    var incPath = includeObj[includeName];
    if (incPath === undefined) {
        // perhaps we can add a comment to mark places where 
        // resolution of path has failed? 
        return null;
    } else {
        var absoluteIncPath = path.resolve(includeRootPath, incPath);
        var testfileDir = path.dirname(testfilePath);
        var modulePath = path.relative(testfileDir, absoluteIncPath);
        modulePath = modulePath.replace('.js', '').replace(/\\/g, '/');
        if (!modulePath.includes('./')) {
            return './' + modulePath;
        }
        return modulePath;
    }
};

module.exports = {
    resolveImportPath: resolveImportPath
};