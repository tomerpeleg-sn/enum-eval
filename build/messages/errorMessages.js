"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (fn) {
  return {
    enumeration: fn + "() enumeration property can only be of type string or number",
    value: fn + "() value property type error, provide one of the following types:\n- String\n- Number\n- Boolean\n- Null\n- FileObject\n- Function (returning one of the above)",
    valueUndefined: fn + "() value property can't be undefined",
    pattern: fn + "() pattern property of type number or object are not allowed",
    patternArray: fn + "() pattern property of type array can contain only strings or array containing other strings",
    valueFile: fn + "() value property can't be string if pattern is an array",
    identifier: fn + "() identifier property can be only string, number or undefined",
    descriptor: fn + "() accepts only enumerated objects or array of objects as a param",
    lessThanTwoParam: fn + "() requires at least two parametres",
    errorArray: fn + "() errorArray parametre must be an array"
  };
};

;