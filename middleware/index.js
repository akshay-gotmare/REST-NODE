const fs = require("fs");
const generateLogs = (fileName) => {
  return (req, res, next) => {
    console.log("Inside Middelware 1");
    fs.appendFile(
      fileName,
      `\n${Date.now()} : ${req.ip} : ${req.method} : ${req.path}`,
      (err, data) => {
        next();
      }
    );
  };
};

module.exports = { generateLogs };
