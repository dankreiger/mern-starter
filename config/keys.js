module.exports = {
  mongoURI: `mongodb://${process.env.MLAB_DB_USER}:${
    process.env.MLAB_DB_PASSWORD
  }@ds057000.mlab.com:57000/puppyconnector`,
  secretOrKey: `${process.env.SECRET_OR_KEY}`
};
