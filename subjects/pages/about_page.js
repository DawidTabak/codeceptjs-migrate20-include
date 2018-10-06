const I = actor();

module.exports = {

  // setting locators
  fields: {
    about: '#about',
  },

  // introducing methods
  viewAbout() {
    I.click(this.about);
  }
}