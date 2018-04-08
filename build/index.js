#!/usr/bin/env node
'use strict';

require('babel-polyfill');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _clear = require('clear');

var _clear2 = _interopRequireDefault(_clear);

var _figlet = require('figlet');

var _figlet2 = _interopRequireDefault(_figlet);

var _configstore = require('configstore');

var _configstore2 = _interopRequireDefault(_configstore);

var _files = require('./lib/files.js');

var files = _interopRequireWildcard(_files);

var _inquirer = require('./lib/inquirer.js');

var inquirer = _interopRequireWildcard(_inquirer);

var _cmd = require('./lib/cmd.js');

var cmd = _interopRequireWildcard(_cmd);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var conf = new _configstore2.default('scannerCli');

var run = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var ans;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _clear2.default)();
            console.log(_chalk2.default.yellow(_figlet2.default.textSync('Scanner', { horizontalLayout: 'full' })));

            _context.next = 4;
            return inquirer.selectCommand();

          case 4:
            ans = _context.sent;

            if (ans.command.toLowerCase() === "scan") {
              getScanInfo();
            } else if (ans.command.toLowerCase() === "location") {
              addLocation();
            }

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function run() {
    return _ref.apply(this, arguments);
  };
}();

var addLocation = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var ans, locations;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return inquirer.addLocation();

          case 2:
            ans = _context2.sent;
            locations = conf.get('locations') || [];

            if (locations.indexOf(ans.location) === -1) {
              locations.push(ans.location);
              console.log("Added Location: ", ans.location);
            } else {
              locations = locations.filter(function (loc) {
                return loc !== ans.location;
              });
              console.log("Removed Location: ", ans.location);
            }
            conf.set('locations', locations);
            setTimeout(function () {
              run();
            }, 2000);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function addLocation() {
    return _ref2.apply(this, arguments);
  };
}();

var getScanInfo = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var ans, loc, bool, _bool;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return inquirer.askQuestions(conf.get('family'), conf.get("device"));

          case 2:
            ans = _context3.sent;

            conf.set('family', ans.family);
            conf.set('device', ans.device);

            if (!(ans.type.toLowerCase() === 'learn')) {
              _context3.next = 37;
              break;
            }

            _context3.next = 8;
            return inquirer.selectLocation(conf.get('locations'));

          case 8:
            loc = _context3.sent;
            _context3.next = 11;
            return inquirer.confirm("You wish to Learn the Location " + loc.location + " to the Family " + ans.family + " with the Device " + ans.device + "?");

          case 11:
            bool = _context3.sent;

            if (!bool.con) {
              _context3.next = 34;
              break;
            }

            _context3.prev = 13;
            _context3.next = 16;
            return cmd.run("sudo docker stop scanner");

          case 16:
            _context3.next = 18;
            return cmd.run("sudo docker start scanner");

          case 18:
            cmd.run('sudo docker exec scanner sh -c "find3-cli-scanner -i wlan0 -device ' + ans.device.toLowerCase() + ' -family ' + ans.family.toLowerCase() + ' -server https://cloud.internalpositioning.com -scantime 100  -forever -location ' + loc.location.toLowerCase() + '"');
            _context3.next = 21;
            return inquirer.awaitKey("Learning. Press enter to stop.");

          case 21:
            console.log("Shutting down");
            _context3.next = 24;
            return cmd.run("sudo docker stop scanner");

          case 24:
            console.log("Done");
            setTimeout(function () {
              run();
            }, 2000);
            _context3.next = 32;
            break;

          case 28:
            _context3.prev = 28;
            _context3.t0 = _context3['catch'](13);

            console.log("Failed to run commands");
            setTimeout(function () {
              run();
            }, 2000);

          case 32:
            _context3.next = 35;
            break;

          case 34:
            run();

          case 35:
            _context3.next = 63;
            break;

          case 37:
            _context3.next = 39;
            return inquirer.confirm("You wish to Scan the current location the Family " + ans.family + " with the Device " + ans.device + "?");

          case 39:
            _bool = _context3.sent;

            if (!_bool.con) {
              _context3.next = 62;
              break;
            }

            _context3.prev = 41;
            _context3.next = 44;
            return cmd.run("sudo docker stop scanner");

          case 44:
            _context3.next = 46;
            return cmd.run("sudo docker start scanner");

          case 46:
            cmd.run('sudo docker exec scanner sh -c "find3-cli-scanner -i wlan0 -device ' + ans.device.toLowerCase() + ' -family ' + ans.family.toLowerCase() + ' -server https://cloud.internalpositioning.com -scantime 100  -forever"');
            _context3.next = 49;
            return inquirer.awaitKey("Scanning. Press enter to stop.");

          case 49:
            console.log("Shutting down");
            _context3.next = 52;
            return cmd.run("sudo docker stop scanner");

          case 52:
            console.log("Done");
            setTimeout(function () {
              run();
            }, 2000);
            _context3.next = 60;
            break;

          case 56:
            _context3.prev = 56;
            _context3.t1 = _context3['catch'](41);

            console.log("Failed to run commands");
            setTimeout(function () {
              run();
            }, 2000);

          case 60:
            _context3.next = 63;
            break;

          case 62:
            run();

          case 63:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[13, 28], [41, 56]]);
  }));

  return function getScanInfo() {
    return _ref3.apply(this, arguments);
  };
}();

run();

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {
  cmd.run("sudo docker stop scanner").then(function () {
    console.log("Stopping all");
  });
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));