"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userUpdate = exports.updateUser = exports.newUser = exports.loginUser = exports.getUser = exports.getAllUsers = exports.forgotPassword = exports.deleteUser = void 0;
var _httpStatusCodes = _interopRequireDefault(require("http-status-codes"));
var UserService = _interopRequireWildcard(require("../services/user.service"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
const getAllUsers = async (req, res, next) => {
  try {
    const data = await UserService.getAllUsers();
    res.status(_httpStatusCodes.default.OK).json({
      code: _httpStatusCodes.default.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
exports.getAllUsers = getAllUsers;
const getUser = async (req, res, next) => {
  try {
    const data = await UserService.getUser(req.params._id);
    res.status(_httpStatusCodes.default.OK).json({
      code: _httpStatusCodes.default.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
exports.getUser = getUser;
const newUser = async (req, res, next) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(_httpStatusCodes.default.CREATED).json({
      code: _httpStatusCodes.default.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    next(error);
  }
};
exports.newUser = newUser;
const loginUser = async (req, res, next) => {
  try {
    const data = await UserService.loginUser(req.body);
    res.status(_httpStatusCodes.default.OK).json({
      code: _httpStatusCodes.default.OK,
      token: data,
      message: 'Login successfully.....'
    });
  } catch (error) {
    next(error);
  }
};
exports.loginUser = loginUser;
const forgotPassword = async (req, res, next) => {
  try {
    const data = await UserService.forgotPassword(req.body);
    res.status(_httpStatusCodes.default.OK).json({
      code: _httpStatusCodes.default.OK,
      data: data.message
    });
  } catch (error) {
    next(error);
  }
};
exports.forgotPassword = forgotPassword;
const userUpdate = async (req, res, next) => {
  try {
    const data = await UserService.userUpdate(req.body);
    res.status(_httpStatusCodes.default.OK).json({
      code: _httpStatusCodes.default.OK,
      data: data
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
exports.userUpdate = userUpdate;
const updateUser = async (req, res, next) => {
  try {
    const data = await UserService.updateUser(req.params._id, req.body);
    res.status(_httpStatusCodes.default.ACCEPTED).json({
      code: _httpStatusCodes.default.ACCEPTED,
      data: data,
      message: 'User updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
  try {
    await UserService.deleteUser(req.params._id);
    res.status(_httpStatusCodes.default.OK).json({
      code: _httpStatusCodes.default.OK,
      data: [],
      message: 'User deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = deleteUser;