const mongoose = require("mongoose");
const connectWithDb = async () => {
  await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("connection is successful");
    })
    .catch(() => {
      console.log("connection is not successful");
    });
};
module.exports = connectWithDb;    

