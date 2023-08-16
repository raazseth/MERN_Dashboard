const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    about: {
      type: String,
      trim: true,
    },
    skills: [{ type: String }],
    certifications: [
      {
        skill: { type: String },
        platform: { type: String },
      },
    ],
    experience: [
      {
        title: { type: String },
        company: { type: String },
        location: { type: String },
        from: { type: Date },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    education: [
      {
        school: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        from: { type: Date },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String },
      },
    ],
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dybxqfdaw/image/upload/v1692097363/Test/man_y9hd89.png",
    },
    hash_password: {
      type: String,
      required: true,
    },
    connections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compare(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
