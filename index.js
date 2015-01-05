/*
 * Copyright (C) 2015  Erik Wienhold
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */


'use strict';


var Checker = require('jscs');
var loadConfigFile = require('jscs/lib/cli-config');


var Preprocessor = function (loggerFactory, config) {

  var log = loggerFactory.create('jscs');

  var checker = createChecker(config);

  return function(content, file, done){
    log.debug('Processing "%s".', file.originalPath);

    var errors = checker.checkString(content, file.originalPath);
    var errorList = errors.getErrorList();

    if (errorList.length === 0) {
      done(undefined, content);
    } else {
      errorList.forEach(function (err) {
        log.error(errors.explainError(err, true));
      });
      done(errors);
    }
  };

};


Preprocessor.$inject = ['logger', 'config.jscsPreprocessor'];


module.exports = {
  'preprocessor:jscs': ['factory', Preprocessor]
};


function createChecker(config) {
  var checker = new Checker();
  checker.registerDefaultRules();
  checker.configure(loadRules(config));
  return checker;
}


function loadRules(config) {
  var rules;
  if (config.configPath) {
    rules = loadConfigFile.load(config.configPath);
  }
  if (config.rules) {
    rules = extend(rules || {}, config.rules);
  }
  return rules;
}


function extend(target, source) {
  return Object.keys(source).reduce(function (target, name) {
    target[name] = source[name];
    return target;
  }, {});
}
