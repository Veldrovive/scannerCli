"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dirName = undefined;

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dirName = exports.dirName = _path2.default.basename(process.cwd());
console.log("Files");