'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validate;

var _errorMessages = require('./messages/errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _fixArray = require('./utils/fixArray');

var _fixArray2 = _interopRequireDefault(_fixArray);

var _concatArguments = require('./utils/concatArguments');

var _concatArguments2 = _interopRequireDefault(_concatArguments);

var _errorCheckParam = require('./utils/errorCheckParam');

var _errorCheckParam2 = _interopRequireDefault(_errorCheckParam);

var _defaultParam = require('./utils/defaultParam');

var _defaultParam2 = _interopRequireDefault(_defaultParam);

var _evaluate = require('./evaluate/evaluate');

var _evaluate2 = _interopRequireDefault(_evaluate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate() {
  var descriptor = (0, _concatArguments2.default)(arguments);
  descriptor = (0, _defaultParam2.default)(descriptor, 'descriptor');
  (0, _errorCheckParam2.default)(descriptor, 'descriptor', validate.name);

  var pipeline = [function (arr) {
    return arr.map(function (i) {
      return (0, _evaluate2.default)(i.enumeration, i.value, i.pattern, i.elementType, i.identifier, i.optional);
    });
  }, function (arr) {
    return (0, _fixArray2.default)(arr.map(function (item) {
      return item;
    }));
  }];
  return pipeline.reduce(function (acc, fn) {
    return fn(acc);
  }, descriptor);
}