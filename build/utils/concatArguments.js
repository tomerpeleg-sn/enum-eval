'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = concatArguments;

var _fixArray = require('./fixArray');

var _fixArray2 = _interopRequireDefault(_fixArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function concatArguments(args) {
  return Object.keys(args).reduce(function (acc, val) {
    return Object.assign(acc, (0, _fixArray2.default)(args[val]));
  }, {});
}