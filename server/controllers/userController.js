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

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const myUser = await User.findOne({ username });
    if (!myUser)
      return res.json({
        msg: "Username or Password is incorrect",
        status: false,
      });

    const passwordValidation = await bcrypt.compare(password, myUser.password);
    if (!passwordValidation)
      return res.json({
        msg: "Username or Password is incorrect",
        status: false,
      });
    delete myUser.password;

    return res.json({ status: true, myUser });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

// module.exports.setAvatar = async (req, res, next) => {
//   try {
//     const userId = req.params.id;
//     const avatarImage = req.body.image;
//     const userData = await User.findByIdAndUpdate(userId, {
//       isAvatarImageSet: true,
//       avatarImage,
//     });
//     return res.json({
//       isSet: userData.isAvatarImageSet,
//       image: userData.avatarImage,
//     });
//   } catch (ex) {
//     next(ex);
//   }
// };
