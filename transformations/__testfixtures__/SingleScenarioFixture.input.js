Feature('Simple feature');

Scenario('Simple scenario', (I) => {
    I.say('test');
});

Scenario('Simple scenario 2', (I, loginPage) => {
    I.say('test');
    loginPage.login();
});