const mongoose = require("mongoose");
const validator = require("validator");
// const bcrypt = require("bcryptjs");
// const crypto = require("crypto");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    image: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    userPositions: { type: new Schema({ any: Schema.Types.Mixed }), default: false },
    password: {
      type: String,
      required: [true, "Please enter a password!"],
      minLength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password are not same!",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

// userSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) return next();

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

// userSchema.pre("save", async function (next) {
//   // only run this function is password is modified
//   if (!this.isModified("password")) return next();

//   // Hash the password the cost of 12
//   this.password = await bcrypt.hash(this.password, 12);

//   // Delete passwordConfirm field
//   this.passwordConfirm = undefined;
// });

userSchema.pre(/^find/, async function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
//   return await bcrypt.compare(candidatePassword, userPassword);
// };

// userSchema.methods.changesPasswordAfter = function (jwtTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedPasswordTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
//     return jwtTimestamp < changedPasswordTimestamp;
//   }
//   // False means not changed
//   return false;
// };

// userSchema.methods.createPasswordResetToken = function () {
//   const resetToken = crypto.randomBytes(32).toString("hex");
//   this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
//   return resetToken;
// };

const User = model("User", userSchema);

module.exports = User;
