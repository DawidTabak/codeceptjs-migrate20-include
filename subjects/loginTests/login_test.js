Feature('Login feature');

Scenario('This is a sample login test 1', (I, loginPage) => {
    loginPage.sendForm("tester@test.com", "secret");
    I.see('Hi there tester@test.com');
});

Scenario('This is a sample login test 2', (loginPage, I) => {
    loginPage.sendForm("bob@test.com", "secret");
    I.see('Hi there bob@test.com');
});