module.exports.logout = (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
};

module.exports.redirectHome = (req, res) => {
  res.redirect("/");
};
