'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectLocation = exports.askQuestions = exports.addLocation = exports.awaitKey = exports.confirm = exports.selectCommand = undefined;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _files = require('./files.js');

var _files2 = _interopRequireDefault(_files);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var selectCommand = exports.selectCommand = function selectCommand() {
  var questions = [{
    name: 'command',
    type: 'list',
    message: 'Do you want to add a Location or start a Scan?',
    choices: ["Location", "Scan"]
  }];
  return _inquirer2.default.prompt(questions);
};

var confirm = exports.confirm = function confirm(question) {
  var questions = [{
    name: 'con',
    type: 'confirm',
    message: question
  }];
  return _inquirer2.default.prompt(questions);
};

var awaitKey = exports.awaitKey = function awaitKey(inst) {
  var questions = [{
    name: 'none',
    message: inst
  }];
  return _inquirer2.default.prompt(questions);
};

var addLocation = exports.addLocation = function addLocation() {
  var questions = [{
    name: 'location',
    type: 'input',
    message: 'Enter a name for the location (Enter an already added location to delete it):',
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter a name';
      }
    }
  }];
  return _inquirer2.default.prompt(questions);
};

var askQuestions = exports.askQuestions = function askQuestions(defFam, defDev) {
  var questions = [{
    name: 'type',
    type: 'list',
    message: 'Do you want to Learn or Scan?',
    choices: ["Learn", "Scan"],
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter a name';
      }
    }
  }, {
    name: 'family',
    type: 'input',
    message: 'Enter your Family name:',
    default: defFam,
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter a name';
      }
    }
  }, {
    name: 'device',
    type: 'input',
    message: 'Enter your Device name:',
    default: defDev,
    validate: function validate(value) {
      if (value.length) {
        return true;
      } else {
        return 'Please enter a name';
      }
    }
  }];
  return _inquirer2.default.prompt(questions);
};

var selectLocation = exports.selectLocation = function selectLocation(locList) {
  var question = [{
    name: 'location',
    type: 'list',
    message: 'Which location would you like to Learn?',
    choices: locList
  }];
  return _inquirer2.default.prompt(question);
};