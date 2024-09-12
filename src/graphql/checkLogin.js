const checkLogin = (context) => {
  if (!context.user.id) {
    throw new Error("The token is obsolete");
  }
};

module.exports = checkLogin;
