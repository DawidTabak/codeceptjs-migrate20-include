exports.config = {
    "tests": "./*_test.js",
    "timeout": 10000,
    "output": "./output",
    "testmachine": "http://localhost:4200",
    "helpers": {
      "Puppeteer": {
        "url": "http://localhost:4200",
        "waitForNavigation": "networkidle0",
        // default is 100
        "waitForAction": 100,
        "show": false,
        "chrome": {
          "ignoreHTTPSErrors": true
        }
      },
      "Mochawesome": {},
      "REST": {}
    },
    "include": {
      "I": "./steps_file.js",
      "loginPage": "./pages/login_page.js",
      "aboutPage": "./pages/about_page.js"
    },
    "mocha": {
      "reporterOptions": {
          "codeceptjs-cli-reporter": {
              "stdout": "-",
              "options": {
                  "verbose": true,
                  "steps": true
              }
          },
  
          "mocha-junit-reporter": {
              "stdout": "./output/console.log",
              "options": {
                  "mochaFile": "./output/result.xml",
              }
          },
          "mochawesome": {
              "stdout": "./output/console.log",
              "options": {
                  "overwrite": false,
                  "reportDir": "./output",
                  "reportFilename": "report"
              }
          }
      } 
    },
    "gherkin": {
      "features": "./features/*.feature",
      "steps": [
        "./features/step_definitions/basic.steps.js"
      ]
    },
    "bootstrap": false,
    "mocha": {},
    "name": "playground01"
  };