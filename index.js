const program = require('commander'),
    glob = require('glob'),
    path = require('path'),
    readFileSync = require('fs').readFileSync,
    runner = require('jscodeshift/src/Runner')
    ;

program
    .version('0.0.1')
    .option('-c, --config <config>', 'path to codeceptjs config')
    .option('-f, --files <files>', 'glob of files to transform')
    .option('-s, --silent')
    .option('-d, --dry', 'run without actually making the changes to file')
    ;

program.parse(process.argv);

var codeceptConfPath = program.config || './codecept.conf.js';
var codeceptConf = getConfigFromPath(path.resolve(process.cwd(), codeceptConfPath));

var filesGlob = program.files != undefined ? program.files : codeceptConf.tests;
let testFiles = getFilesByPattern(filesGlob);

function getFilesByPattern(pattern) {
    let testFiles = [];
    glob.sync(pattern, {} /*options*/).forEach((file) => {
        if (!path.isAbsolute(file)) {
            file = path.join(process.cwd(), file);
        }
        testFiles.push(path.resolve(file));
    }); 
    return testFiles;
}

function getConfigFromPath(configPath) {
    if (path.parse(configPath).ext === '.js') {
        return require(configPath).config;
    } else {
        return JSON.parse(readFileSync(configPath, 'utf8'));
    }
}

var includeRootPath = path.dirname(path.resolve(codeceptConfPath));

runner.run(path.resolve(__dirname, './transformations/removeparams.js'), testFiles, {
    dry: program.dry == undefined ? false : program.dry,
    runInBand: true, // for debugging, otherwise the process will be forked which results in debugging not working correctly 
    print: program.silent == undefined ? true : program.silent,

    // codecept specific
    includeRootPath: includeRootPath,
    includeObj: codeceptConf.include
});