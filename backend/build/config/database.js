"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _logger = _interopRequireDefault(require("./logger"));
const database = async () => {
  try {
    // Replace database value in the .env file with your database config url
    const DATABASE = process.env.NODE_ENV === 'test' ? process.env.DATABASE_TEST : process.env.DATABASE;
    await _mongoose.default.connect(DATABASE, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _logger.default.info('Connected to the database.');
  } catch (error) {
    _logger.default.error('Could not connect to the database.', error);
  }
};
var _default = exports.default = database;