const bcrypt = require("bcryptjs");

//models
const Event = require("../../models/event");
const User = require("../../models/user");

const user = (userId) => {
  return User.findById(userId)
    .then((user) => {
      return {
        ...user._doc,
        _id: user._doc._id.toString(),
        password: null,
        createdEvents: events.bind(this, user._doc.createdEvents),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const events = (eventIds) => {
  return Event.find({ _id: { $in: eventIds } })
    .then((events) => {
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: user.bind(this, event._doc.creator),
        };
      });
    })
    .catch((err) => {
      throw err;
    });
};

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => {
        return events.map((event) => {
          return {
            ...event._doc,
            _id: event.id,
            date: new Date(event._doc.date).toISOString(),
            creator: user.bind(this, event._doc.creator),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  users: () => {
    return User.find()
      .then((users) => {
        return users.map((user) => {
          return {
            ...user._doc,
            _id: user.id,
            password: null,
            createdEvents: events.bind(this, user._doc.createdEvents),
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  createEvent: (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: "6343e65ec6684bf7820cbc3b",
    });
    let createdEvent;
    return event
      .save()
      .then((result) => {
        createdEvent = { ...result._doc, _id: result._doc._id.toString() };
        return User.findById("6343e65ec6684bf7820cbc3b");
      })
      .then((user) => {
        if (!user) {
          throw new Error("User not found");
        }
        user.createdEvents.push(createdEvent._id);
        return user.save();
      })
      .then(() => {
        return createdEvent;
      })
      .catch((err) => {
        console.error(err.message);
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
        return {
          ...result._doc,
          _id: result._doc._id.toString(),
          password: null,
        };
      })
      .catch((err) => {
        throw err;
      });
  },
};
