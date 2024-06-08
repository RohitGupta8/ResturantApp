"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.newUser = exports.loginUser = exports.getUser = exports.getAllUsers = exports.generateToken = exports.forgotPassword = exports.deleteUser = void 0;
var _user = _interopRequireDefault(require("../models/user.model"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
const generateToken = data => {
  return _jsonwebtoken.default.sign(data, process.env.SECRET, {
    expiresIn: '5h'
  });
};

//get all users
exports.generateToken = generateToken;
const getAllUsers = async () => {
  const data = await _user.default.find();
  return data;
};

//create new user
exports.getAllUsers = getAllUsers;
const newUser = async body => {
  const salt = await _bcrypt.default.genSalt(10);
  const hash = await _bcrypt.default.hash(body.password, salt);
  body.password = hash;
  const data = await _user.default.create(body);
  return data;
};
exports.newUser = newUser;
const loginUser = async body => {
  const check = await _user.default.findOne({
    email: body.email
  });
  if (!check) {
    throw new Error('User not registered....');
  } else {
    const match = await _bcrypt.default.compare(body.password, check.password);
    if (match) {
      const user = {
        email: check.email,
        phone: check.phone,
        id: check._id,
        role: check.role
      };
      return generateToken(user);
    } else {
      throw new Error('Incorrect Password');
    }
  }
};
exports.loginUser = loginUser;
const forgotPassword = async body => {
  let message;
  const user = await _user.default.findOne({
    email: body.email,
    dob: body.dob
  });
  if (!user) {
    message = {
      message: 'Email or Date of Birth do not match.'
    };
  } else if (body.newPassword !== body.confirmPassword) {
    message = {
      message: 'New Password and Confirm Password do not match.'
    };
  } else {
    const salt = await _bcrypt.default.genSalt(10);
    const hashedPassword = await _bcrypt.default.hash(body.newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    message = {
      message: 'Password updated successfully'
    };
  }
  return message;
};

//update single user
exports.forgotPassword = forgotPassword;
const updateUser = async (_id, body) => {
  const data = await _user.default.findByIdAndUpdate({
    _id
  }, body, {
    new: true
  });
  return data;
};

//delete single user
exports.updateUser = updateUser;
const deleteUser = async id => {
  await _user.default.findByIdAndDelete(id);
  return '';
};

//get single user
exports.deleteUser = deleteUser;
const getUser = async id => {
  const data = await _user.default.findById(id);
  return data;
};
exports.getUser = getUser;