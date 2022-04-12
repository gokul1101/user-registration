module.exports = {
  DB: process.env.DB || "mongodb://localhost:27017/registration",
  PORT: process.env.PORT || 5000,
};
