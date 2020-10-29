'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toggleErrorClass;

var _errorCheckParam = require('./utils/errorCheckParam');

var _errorCheckParam2 = _interopRequireDefault(_errorCheckParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Returns a string named 'error' if the targeted element is faulty
function toggleErrorClass(enumeration, errorArray, identifier) {
  (0, _errorCheckParam2.default)(arguments, 'lessThanTwoParams', toggleErrorClass.name);
  (0, _errorCheckParam2.default)(enumeration, 'enumeration', toggleErrorClass.name);
  (0, _errorCheckParam2.default)(errorArray, 'errorArray', toggleErrorClass.name);
  (0, _errorCheckParam2.default)(identifier, 'identifier', toggleErrorClass.name);

  if (!identifier && errorArray) {
    if (errorArray.some(function (i) {
      return i.enumeration === enumeration;
    })) {
      return 'error';
    }
  } else if (identifier) {
    if (errorArray.some(function (i) {
      return i.enumeration === enumeration && i.identifier === identifier;
    })) {
      return 'error';
    }
  }
}