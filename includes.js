const express = require("express");
const router = express.Router();
const verify = require("./verify");
const db = require("./con");

module.exports = { db, router, verify };
