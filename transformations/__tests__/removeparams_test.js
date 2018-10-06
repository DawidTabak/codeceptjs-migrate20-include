jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

let options = {
    // we setup codecept config/tests root in '__testfixtures__' dir
    includeRootPath: './transformations/__testfixtures__',
    includeObj: {
        loginPage: './pages/loginPage'
    }
};

defineTest(__dirname, 'removeparams', options, 'SingleScenarioFixture');