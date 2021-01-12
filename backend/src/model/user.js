const mongoose = require("mongoose");
/* mongoose.set("useCreateIndex", true); */
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      trim: true,
    },

    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },

    hash_password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    contactNumber: {
      type: String,
    },

    profilePicture: { type: String },
  },
  { timestamps: true }
);
// virtual = make virtual field like prototype method.
// result below = if we call like user.password = 1212123
// then, making password property {password : something translated by bcrpt}
userSchema.virtual("password").set(function (passowrd) {
  this.hash_password = bcrypt.hashSync(passowrd, 10);
});

userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.methods.authentificate = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model("User", userSchema);
