const { validateBody } = require("./validateBody");
const { validateID } = require("./validateID");
const { authenticate } = require("./authenticate");
const {upload, tempDir} = require('./upload')
module.exports = {
  validateBody,
  validateID,
  authenticate,
  upload,
  tempDir
};
