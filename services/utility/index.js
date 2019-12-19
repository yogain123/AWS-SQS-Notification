const config = require("config");
//const configGet = config.get('elastic');
const fs = require("fs");
const path = require("path");
let lo = require("lodash");

const methods = {};

methods.errorCode = function(key) {
  var errorCodes = {
    NOTIFICATION_CREATE_ERROR: "E0001"
  };
  if (errorCodes[key]) return errorCodes[key];
  else return errorCodes["UNHANDALED_ERROR"];
};

methods.errorMessage = function(key) {
  var errorMessage = {
    E0001: "Unable to create notification log",
    E0002: "Unable to get log"
  };
  if (errorMessage[key]) return errorMessage[key];
  else return errorMessage["Oops, something went wrong"];
};

module.exports = methods;
