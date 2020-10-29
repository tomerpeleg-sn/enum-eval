"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fixArray;
function fixArray(item) {
  var pipeline = [function (arr) {
    return Array.isArray(arr) ? [].concat.apply([], item.map(fixArray)) : item;
  }, function (element) {
    return Array.isArray(element) ? element.filter(function (el, index, self) {
      return self.indexOf(el) === index;
    }) : item;
  }];
  return pipeline.reduce(function (acc, fn) {
    return fn(acc);
  }, item);
}