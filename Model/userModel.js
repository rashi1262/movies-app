const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    deviceType: {
      type: String,
    },
    phone: {
      type: String,
    },
    channel: {
      type: String,
    },
    name: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    ip: {
      type: String,
    },
    timezone: {
      type: String,
    },
    city: {
      name: { type: String },
    },
    subdivisions: {
      code: { type: String },
      name: { type: String },
    },
    country: {
      code: { type: String },
      name: { type: String },
    },
    continent: {
      code: { type: String },
    },
    latitude: {
      type: String,
    },
    longitude: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    ipLocation: {
      city: {
        name: { type: String },
      },
      subdivisions: {
        code: { type: String },
        name: { type: String },
      },
      country: {
        code: { type: String },
        name: { type: String },
      },
      continent: {
        code: { type: String },
      },
      latitude: {
        type: String,
      },
      longitude: {
        type: String,
      },
      postalCode: {
        type: String,
      },
    },
    wishlist: {
      type: [String],
      validate: {
        validator: function (value) {
          // Check for duplicate values in the array
          return value.length === new Set(value).size;
        },
        message: "Movie is already in wishlist.",
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
