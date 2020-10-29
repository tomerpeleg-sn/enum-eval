"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = generateRowId;
var rowId = 0;
function generateRowId() {
  return "row_" + (rowId += 1);
}