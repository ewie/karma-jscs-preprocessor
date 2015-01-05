# karma-jscs-preprocessor

Preprocessor for [Karma](http://karma-runner.github.io) to check code style of your JavaScript using [JSCS](http://jscs.info).


## Installation

Just maintain `karma-jscs-preprocessor` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "karma": "~0.12",
    "karma-jscs-preprocessor": "~0.1"
  }
}
```

This can be achieved by:

```bash
npm install karma-jscs-preprocessor --save-dev
```

## Usage

Specifiy the files you want to be style checked in the preprocessor section of your `karma.conf.js`.

```javascript
preprocessors: {
  '*.js': [ 'jscs' ]
}
```


#### Use Your Existing JSCS Configuration

You can use your existing JSCS config `.jscsrc` (or any other filename) as source of your validation rules.
Just specify property `configPath` with, for example, value `.jscsrc`.

```javascript
module.exports = function (config) {
  config.set({
    jscsPreprocessor: {
      configPath: '.jscsrc'
    }
  });
};
```


#### Override Rules

Instead of relying on a JSCS config file you can also specify all rules under property `rules`.
Those rules have higher precendence than rules from the config file, i.e. they will override rules read from the config file.

```javascript
module.exports = function (config) {
  config.set({
    jscsPreprocessor: {
      rules: {
        validateIndentation: 2
      }
    }
  });
};
```


## License

Licensed under the [AGPL-3.0](http://www.gnu.org/licenses/agpl-3.0.html).
