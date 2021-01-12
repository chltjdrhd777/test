const jwt = require("jsonwebtoken");
const User = require("../../model/user");

exports.signUp = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, exist) => {
    if (exist) {
      return res
        .status(400)
        .json({ message: "the Admin account is already registered" });
    }

    const { firstName, lastName, email, password } = req.body;

    const _user = new User({
      firstName,
      lastName,
      email,
      password,
      userName: Math.random().toString(),
      role: "admin",
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something wrong",
        });
      }

      if (data) {
        return res.status(201).json({
          message: "admin created successfully",
        });
      }
    });
  });
};

exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }

    if (user) {
      if (user.authentificate(req.body.password) && user.role === "admin") {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({
          messaage: "password is wrong",
        });
      }
    } else {
      return res.status(400).json({
        message: "there is error",
      });
    }
  });
};

exports.requireSignIn = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
  //jwt.decode();
};
