'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = evaluate;

var _errorCheckParam = require('../utils/errorCheckParam');

var _errorCheckParam2 = _interopRequireDefault(_errorCheckParam);

var _defaultParam = require('../utils/defaultParam');

var _defaultParam2 = _interopRequireDefault(_defaultParam);

var _errorMessages = require('../messages/errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _getFileExtension = require('./getFileExtension');

var _getFileExtension2 = _interopRequireDefault(_getFileExtension);

var _listExtensions = require('./listExtensions');

var _listExtensions2 = _interopRequireDefault(_listExtensions);

var _checkFileExtension = require('./checkFileExtension');

var _checkFileExtension2 = _interopRequireDefault(_checkFileExtension);

var _validate = require('../validate');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function evaluate(enumeration, value, pattern, elementType, identifier, optional) {
  enumeration = (0, _defaultParam2.default)(enumeration, 'enumeration');
  value = (0, _defaultParam2.default)(value, 'value');
  pattern = (0, _defaultParam2.default)(pattern, 'pattern');
  elementType = (0, _defaultParam2.default)(elementType, 'elementType');

  (0, _errorCheckParam2.default)(enumeration, 'enumeration', _validate2.default.name);
  (0, _errorCheckParam2.default)(value, 'value', _validate2.default.name);
  (0, _errorCheckParam2.default)(pattern, 'pattern', _validate2.default.name);
  (0, _errorCheckParam2.default)(identifier, 'identifier', _validate2.default.name);

  var error = [];
  var hasError = void 0;

  switch (elementType) {
    case 'all-files':
      value = (0, _defaultParam2.default)(value, 'valueFile');
      (0, _errorCheckParam2.default)(value, 'valueFile', _validate2.default.name);
      var objectNotEmpty = Object.keys(value).length;
      if (objectNotEmpty) {
        hasError = (0, _listExtensions2.default)(undefined);
      } else {
        hasError = true;
      }
      break;
    case 'select':
      hasError = pattern.test(value);
      break;
    default:
      if (pattern instanceof RegExp) {
        hasError = !pattern.test(value);
        if (optional && value === '') {
          hasError = false;
        }
      }

      if (pattern === '') {
        hasError = pattern === value;
      }

      if (typeof pattern === 'boolean') {
        hasError = pattern !== value;
      }

      if (Array.isArray(pattern)) {
        value = (0, _defaultParam2.default)(value, 'valueFile');
        (0, _errorCheckParam2.default)(value, 'valueFile', _validate2.default.name);
        var emptyObject = !Object.keys(value).length;
        if (!emptyObject) {
          var validFilename = (0, _checkFileExtension2.default)(value);
          if (validFilename) {
            var fileExtension = void 0;
            switch (Array.isArray(pattern[0])) {
              case false:
                fileExtension = (0, _getFileExtension2.default)(value);
                hasError = (0, _listExtensions2.default)(fileExtension, pattern, 'whitelist');
                break;
              default:
                fileExtension = (0, _getFileExtension2.default)(value);
                hasError = (0, _listExtensions2.default)(fileExtension, pattern, 'blacklist');
            }
          } else {
            hasError = true;
          }
        } else {
          if (optional) {
            hasError = false;
          } else {
            hasError = true;
          }
        }
      }
  }

  if (hasError) {
    error.push({
      enumeration: enumeration,
      identifier: identifier
    });
  }
  return error;
}