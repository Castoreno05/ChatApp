const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const verifyUsername = await User.findOne({ username });

    if (verifyUsername)
      return req.json({ msg: "Username has been taken", status: false });

    const verifyEmail = await User.findOne({ email });
    if (verifyEmail)
      return req.json({ msg: "Email has been taken", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
