'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.run = undefined;

var _nodeCmd = require('node-cmd');

var _nodeCmd2 = _interopRequireDefault(_nodeCmd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var run = exports.run = function run(command) {
  return new Promise(function (resolve, reject) {
    try {
      _nodeCmd2.default.get(command, function (err, data, stderr) {
        if (err) return reject(err);
        resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};