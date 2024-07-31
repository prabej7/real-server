const checkFields = (noOfFields) => {
  return (req, res, next) => {
    const noOfFieldReceived = Object.keys(req.body).length;
    if (noOfFieldReceived >= noOfFields) {
      return next();
    }
    res.status(400).json({ error: "Please provide all the fields!" });
  };
};

module.exports = checkFields;
