const I = actor(), loginPage = require("./pages/loginPage");
Feature('Simple feature');

Scenario('Simple scenario', () => {
    I.say('test');
});

Scenario('Simple scenario 2', () => {
    I.say('test');
    loginPage.login();
});