'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeCheck = executeCheck;
exports.default = defaultParam;
function executeCheck(param) {
  if (typeof param === 'function') {
    return param();
  } else {
    return param;
  }
}

function defaultParam(param, type) {
  param = executeCheck(param);
  switch (type) {
    case 'enumeration':
      return param;
    case 'value':
      if (param === null) {
        return '';
      } else {
        return param;
      }
    case 'pattern':
      if (param === null || typeof param === 'undefined') {
        return '';
      }
      if (typeof param === 'string') {
        return param = new RegExp('^' + param + '$');
      } else {
        return param;
      }
    case 'elementType':
      return param;
    case 'optional':
      return true;
    case 'valueFile':
      if (param === '') {
        return {};
      } else {
        return param;
      }
    case 'descriptor':
      return Object.keys(param).map(function (key) {
        return {
          enumeration: param[key].enumeration ? param[key].enumeration : isNaN(key) ? key : Number(key),
          value: param[key].value,
          pattern: param[key].pattern,
          elementType: param[key].elementType,
          identifier: param[key].identifier,
          optional: param[key].optional
        };
      });
  }
}