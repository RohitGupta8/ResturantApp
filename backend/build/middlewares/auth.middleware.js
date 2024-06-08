"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userAuth = exports.setRole = void 0;
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken) throw {
      code: _httpStatusCodes.default.BAD_REQUEST,
      message: 'Authorization token is required'
    };
    bearerToken = bearerToken.split(' ')[1];
    const {
      user
    } = await _jsonwebtoken.default.verify(bearerToken, process.env.SECRET);
    res.locals.user = user;
    res.locals.token = bearerToken;
    next();
  } catch (error) {
    next(error);
  }
};
exports.userAuth = userAuth;
const setRole = role => {
  return (req, res, next) => {
    req.body.role = role;
    next();
  };
};
exports.setRole = setRole;