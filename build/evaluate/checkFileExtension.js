'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = checkFileExtension;
function checkFileExtension(fileObject) {
  var pipeline = [function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }, function (arr) {
    return arr.every(function (item) {
      return item.name ? item.name.indexOf('.') !== -1 : false;
    });
  }];
  return pipeline.reduce(function (acc, fn) {
    return fn(acc);
  }, fileObject);
}