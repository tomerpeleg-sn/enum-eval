'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = listExtensions;

var _fixArray = require('../utils/fixArray');

var _fixArray2 = _interopRequireDefault(_fixArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function listExtensions(arrOne, arrTwo, action) {
  var whitelist = arrTwo && action === 'whitelist';
  var blacklist = arrTwo && action === 'blacklist';
  var pipeline = [function (arr) {
    return whitelist ? arr.every(function (extension) {
      return arrTwo.indexOf(extension) !== -1;
    }) : blacklist ? arr.every(function (extension) {
      return (0, _fixArray2.default)(arrTwo).indexOf(extension) === -1;
    }) : true;
  }, function (bool) {
    return bool === true ? false : true;
  }];
  return pipeline.reduce(function (acc, fn) {
    return fn(acc);
  }, arrOne);
}