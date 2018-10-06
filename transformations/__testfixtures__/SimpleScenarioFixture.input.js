const myHelper = require('./mylib/myHelper');

Feature('Simple feature');

Scenario('Simple scenario', (I) => {
    I.say('test');
});

Scenario('Simple scenario 2', (I, loginPage) => {
    I.say('test');
    myHelper.help();
    loginPage.login();
});

Scenario('Simple scenario 2', async (I, loginPage) => {
    I.say('test');
    await loginPage.loginTask();
});