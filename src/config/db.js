const { connect } = require("mongoose");
const DBURL = process.env.DB_URL;
const connectToDatabase = () => {
  if (!DBURL) return console.log("Please provide db url!");
  connect(DBURL)
    .then(() => {
      console.log("Cloud Database connected successfully!");
    })
    .catch((e) => {
      connect("mongodb://localhost:27017/real").then(() => {
        console.log("Local Database connected successfully!");
      });
    });
};

module.exports = connectToDatabase;
