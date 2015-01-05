module.exports = function (config) {

  config.set({

    files: [
      'lib/*.js'
    ],

    preprocessors: {
      'lib/*.js': [ 'jscs' ]
    },

    jscsPreprocessor: {
      configPath: '.jscsrc',
      rules: {
        disallowTrailingWhitespace: true
      }
    }

  });

};
