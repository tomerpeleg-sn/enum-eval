'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = errorCheckParam;

var _errorMessages = require('../messages/errorMessages');

var _errorMessages2 = _interopRequireDefault(_errorMessages);

var _fixArray = require('./fixArray');

var _fixArray2 = _interopRequireDefault(_fixArray);

var _mockFileObject = require('../evaluate/mockFileObject');

var _mockFileObject2 = _interopRequireDefault(_mockFileObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function errorCheckParam(param, type, fn) {
  var condition = void 0;
  switch (type) {
    case 'enumeration':
      condition = typeof param === 'string' || typeof param === 'number';
      if (!condition) {
        throw new Error((0, _errorMessages2.default)(fn).enumeration);
      }
      break;
    case 'value':
      condition = typeof param === 'undefined';
      if (condition) {
        throw new Error((0, _errorMessages2.default)(fn).valueUndefined);
      }
      condition = typeof param === 'string' || typeof param === 'number' || typeof param === 'boolean' || (0, _mockFileObject2.default)(param) || param.constructor === Object && !Object.keys(param).length || param.constructor === FileList;
      if (!condition) {
        throw new Error((0, _errorMessages2.default)(fn).value);
      }
      break;
    case 'pattern':
      condition = typeof param === 'number';
      if (condition) {
        throw new Error((0, _errorMessages2.default)(fn).pattern);
      }
      condition = (typeof param === 'undefined' ? 'undefined' : _typeof(param)) === 'object';
      if (condition) {
        condition = param.constructor === Object;
        if (condition) {
          throw new Error((0, _errorMessages2.default)(fn).pattern);
        }
        condition = Array.isArray(param);
        if (condition) {
          condition = function condition(items) {
            return (0, _fixArray2.default)(items).every(function (value) {
              return typeof value === 'string';
            });
          };
          if (!condition(param)) {
            throw new Error((0, _errorMessages2.default)(fn).patternArray);
          }
        }
      }
      break;
    case 'valueFile':
      condition = typeof param === 'string';
      if (condition) {
        throw new Error((0, _errorMessages2.default)(fn).valueFile);
      }
      break;
    case 'identifier':
      condition = typeof param === 'undefined' || typeof param === 'string' || typeof param === 'number';
      if (!condition) {
        throw new Error((0, _errorMessages2.default)(fn).identifier);
      }
      break;
    case 'descriptor':
      condition = Array.isArray(param) && param.length ? param.every(function (item) {
        return item.constructor === Object;
      }) : false;

      if (!condition) {
        throw new Error((0, _errorMessages2.default)(fn).descriptor);
      }
      break;
    case 'lessThanTwoParams':
      condition = param.length < 2 || !param[0] || !param[1];

      if (condition) {
        throw new Error((0, _errorMessages2.default)(fn).lessThanTwoParam);
      }
      break;
    case 'errorArray':
      condition = Array.isArray(param);

      if (!condition) {
        throw new Error((0, _errorMessages2.default)(fn).errorArray);
      }
  }
}