const userData = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

module.exports = { userData };
