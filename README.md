# codeceptjs 2.0 code migration for 'include' objects (Alpha version)
Codemod for migrating of 1.* style [codeceptjs](https://codecept.io) 'include' object dependency injection into require/import declaration.

Currently this codemod is in **Alpha state** with only basic migration and not a lot of testing.
**You should always have the code you're migrating under sourcecontrol!**
This codemod can be run in dry mode to view the changes before actually changing any code. (see the 'how to' section)

In 1.* the 'include' objects are injected into the callback passed to Scenario function as the second parameter ex.:
```js
Scenario('My test scenario', (myIncludeObj) => {
    myIncludeObj.help();
});
```

In codeceptjs 2.0 these 'include' objects will no longer be injected into Scenario callback functions.
The include objects should instead be required/imported.
```js
const myIncludeObj = require('./mylib/myIncludeObj');

Scenario('My test scenario', () => {
    myIncludeObj.help();
});
```

In codeceptjs 1.* these include objects are declared inside the 'include' section of codeceptjs config.
```js
'include': {
    'myIncludeObj': './myLib/myIncludeObj'
}
```

# how to 
After installing the package globally it can be run with the following command where the -c option points to 
codeceptjs config containing the 'include' section and the 'tests' glob pointing to the files which will be migrated:
```sh
codeceptjs-migrate20-include -c <codeceptjs config path>
```

To run the codemod in 'dry mode' without actually modifying the code use the '-d' or '--dry' flag:
```sh
codeceptjs-migrate20-include -c <codeceptjs config path> -d
```

To override the 'tests' glob from codeceptjs config run the command with '-f' or 'files' option:
```sh
codeceptjs-migrate20-include -c <codeceptjs config path> -f <glob pointing to files to migrate>
```