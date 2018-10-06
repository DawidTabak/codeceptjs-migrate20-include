const importResolver = require('../importresolver').resolveImportPath;

test('resolves path of include dependency for testfile in root', () => {
    var result = importResolver(
        'C:/sample/subjects/login/loginTests.js',
        'loginPage',
        { 'loginPage': './pages/loginPage.js' },
        'C:/sample/subjects'
    );
    expect(result).toBe('../pages/loginPage');
});

test('resolves path of include missing in include configuration', () => {
    var result = importResolver(
        'C:/sample/subjects/login/loginTests.js',
        'SomeHelper',
        { 'loginPage': './pages/loginPage.js' },
        'C:/sample/subjects'
    );
    expect(result).toBe(null);
});