const app = require("./app");
const fs = require('fs/promises');
const path = require('path')
const { tempDir } = require('./middleware');
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const uriDB = process.env.DB_HOST;
const connection = mongoose.connect(uriDB);

const isAccessible = path => fs.access(path).then(() => true).catch(() => false);
const publicDir = path.join(__dirname, "public", "avatars");
const createFolderIfNotExist = async folder => {
  if (!(await isAccessible(folder))) {
    await fs.mkdir(folder);
  }
}
connection
  .then(
    app.listen(PORT, () => {
      createFolderIfNotExist(tempDir);
      createFolderIfNotExist(publicDir);
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

module.exports = app;