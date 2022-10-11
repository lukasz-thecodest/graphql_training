const User = require("../../models/user");
const bcrypt = require("bcryptjs");
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
};
