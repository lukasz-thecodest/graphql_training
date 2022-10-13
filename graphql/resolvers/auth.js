const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { transformUser } = require("./merge");

module.exports = {
  users: () => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return transformUser(user);
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  createUser: (args) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("User already exists.");
        }
        return bcrypt.hash(args.userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          email: args.userInput.email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        return transformUser(result);
      })
      .catch((err) => {
        throw err;
      });
  },

  login: async ({ email, password }) => {
    const LOGIN_FAILED_MESSAGE = "Wrong credentials";

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error(LOGIN_FAILED_MESSAGE);
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      throw new Error(LOGIN_FAILED_MESSAGE);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    return {
      userId: user.id,
      token: token,
      tokenExpiration: 1,
    };
  },
};
