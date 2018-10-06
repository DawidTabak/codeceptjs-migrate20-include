let moment = require('moment');
let scn = require('codeceptjs').Scenario;

Feature('Sample feature 2');

Scenario('This is a sample test 1', (I, SomeUnknownHelper) => {
    SomeHelper.helpMe(); 
    I.click('Hi');
});

Scenario('This is a sample test 2', (I, loginPage) => {
    loginPage.sendForm("tester@test.com", "secret");
    I.click('Hi');
});

Scenario('This is a sample test 3', (I, aboutPage) => {
    aboutPage.viewAbout();
    I.click('Hi');
});

Scenario('This is a sample test', someScenario);

function someScenario (I, somePageObject) { 
  I.click('Hi');
  somePageObject.click()
}