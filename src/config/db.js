const { connect } = require("mongoose");
const DBURL = process.env.DB_URL;
const connectToDatabase = () => {
  if (!DBURL) return console.log("Please provide db url!");
  connect(DBURL)
    .then(() => {
      console.log("Database connect successfully!");
    })
    .catch((e) => {
      console.error(e);
    });
};

module.exports = connectToDatabase;
