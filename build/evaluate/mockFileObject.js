'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mockFileObject;
function mockFileObject(element) {
  var pipeline = [function (obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }, function (arr) {
    return arr.some(function (item) {
      return item.name ? typeof item.name === 'string' ? item.name.indexOf('.') !== -1 : false : item.name === '' || item.name === null;
    });
  }];

  return pipeline.reduce(function (acc, fn) {
    return fn(acc);
  }, element);
}