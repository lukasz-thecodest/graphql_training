const authResolver = require("./auth");
const eventsResolver = require("./events");
const bookingsResolver = require("./bookings");

const rootReslover = {
  ...authResolver,
  ...eventsResolver,
  ...bookingsResolver,
};

module.exports = rootReslover;
