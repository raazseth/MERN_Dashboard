const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { fullName, email, password } = req.body;
  const hash_password = await bcrypt.hash(password, 10);
  const _user = new User({
    fullName,
    email,
    hash_password,
  });
  _user
    .save()
    .populate("connections", "_id fullName email picture")
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      const { _id, fullName, email, picture, connections } = user;

      if (user) {
        return res.status(200).json({
          message: "User created successfully",
          token,
          data: {
            _id,
            fullName,
            email,
            picture,
            connections,
          },
        });
      }
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Something went wrong",
        error: err,
      });
    });
};

exports.signin = async (req, res) => {
  await User.findOne({ email: req.body.email })
    .populate("connections", "_id fullName email picture")
    .exec()
    .then(async (user) => {
      if (user) {
        const isPassword = await user.authenticate(req.body.password);
        if (isPassword) {
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          req.header("Authorization", token);

          const {
            _id,
            fullName,
            email,
            picture,
            connections,
            phoneNumber,
            about,
            skills,
            certifications,
            experience,
          } = user;

          res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
              _id,
              fullName,
              email,
              picture,
              connections,
              phoneNumber,
              about,
              skills,
              certifications,
              experience,
            },
          });
        } else {
          return res.status(400).json({
            message: "Invalid Password",
          });
        }
      }
    })
    .catch((error) => {
      return res.status(400).json({ error });
    });
};

exports.updateUser = async (req, res) => {
  const {
    fullName,
    email,
    picture,
    connections,
    phoneNumber,
    about,
    skills,
    certifications,
    experience,
  } = req.body;

  const newUser = {
    fullName,
    email,
    picture,
    connections,
    phoneNumber,
    about,
    skills,
    certifications,
    experience,
  };

  Object.keys(newUser).forEach((key) => {
    if (!newUser[key]) {
      delete newUser[key];
    }
  });

  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: newUser,
    },
    { new: true }
  )
    .populate("connections", "_id fullName email picture")
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "Updated Successfully",
          status: 200,
          data: user,
        });
      }
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Something Went Wrong", status: 400 });
    });
};

exports.getUser = async (req, res) => {
  User.findOne({ _id: req.user._id })
    .populate("connections", "_id fullName email picture")
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "User Found",
          status: 200,
          data: user,
        });
      }
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Something Went Wrong", status: 400 });
    });
};

exports.updatePicture = async (req, res) => {
  const { picture } = req.body;
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: { picture },
    },
    { new: true }
  )
    .populate("connections", "_id fullName email picture")
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "Updated Successfully",
          status: 200,
          data: user,
        });
      }
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Something Went Wrong", status: 400 });
    });
};

exports.UserById = async (req, res) => {
  const { userId } = req.params;
  User.findOne({ _id: userId })
    .populate("connections", "_id fullName email picture")
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "User Found",
          status: 200,
          data: user,
        });
      }
    })
    .catch((err) => {
      return res
        .status(400)
        .json({ message: "Something Went Wrong", status: 400 });
    });
};
