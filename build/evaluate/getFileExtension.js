'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getFileExtension;
function getFileExtension(literal) {
  var pipeline = [function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }, function (arr) {
    return arr.map(function (file) {
      return file.name;
    });
  }, function (arr) {
    return arr.map(function (fileType) {
      return fileType.split('.');
    });
  }, function (arr) {
    return arr.map(function (typeItem) {
      return typeItem.pop();
    });
  }];
  return pipeline.reduce(function (acc, fn) {
    return fn(acc);
  }, literal);
}