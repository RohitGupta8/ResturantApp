"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserValidator = void 0;
var _joi = _interopRequireDefault(require("@hapi/joi"));
const newUserValidator = (req, res, next) => {
  const schema = _joi.default.object({
    name: _joi.default.string().min(4).required()
  });
  const {
    error,
    value
  } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
exports.newUserValidator = newUserValidator;