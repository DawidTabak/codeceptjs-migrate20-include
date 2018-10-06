const I = actor(), loginPage = require("./pages/loginPage");
const myHelper = require('./mylib/myHelper');

Feature('Simple feature');

Scenario('Simple scenario', () => {
    I.say('test');
});

Scenario('Simple scenario 2', () => {
    I.say('test');
    myHelper.help();
    loginPage.login();
});

Scenario('Simple scenario 2', async () => {
    I.say('test');
    await loginPage.loginTask();
});