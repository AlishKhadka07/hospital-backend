const db = require("../../model/index");
const User = db.Users;
const Logout = db.Logout;

var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("./../../config/auth.config");
const { Profile } = require("../../model/index");

exports.register = async (req, res, next) => {
  // Validate request
  console.log(req.body);
  if (!req.body.name && !req.body.email && !req.body.password) {
    res.json({
      status: 400,
      message: "Content can not be empty!",
    });
    return;
  }

  //Creating data to database
  const user = await User.findOrCreate({
    where: { email: req.body.email },
    defaults: {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    },
  });

  await Profile.create({
    userId: user[0].id,
  });
  res.json({
    status: 200,
    message: "Registered user successfully",
  });
};

exports.login = async (req, res, next) => {
  //validating the data
  console.log(req.body);

  //finding the user
  let login = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  console.log("login", login);
  //Checking the user
  if (!login) {
    res.status(200).send({
      message: "Invalid login Credential id",
    });
    return;
  }

  //password checking
  if (bcrypt.compareSync(req.body.password, login.password)) {
    //Setting up sucurity Token
    var token = jwt.sign({ id: login.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });

    let newData = {
      id: login.id,
      name: login.name,
      email: login.email,
      token,
      role: login.role,
    };
    res.cookie("token", token, { httpOnly: true });

    res.status(200).send({
      status: 200,
      message: "success",
      newData,
    });
  } else {
    res.status(200).send({
      message: "Invalid login Credential password",
    });
  }
};

exports.logout = async (req, res) => {
  let token = req.headers["x-access-token"];
  let logout = await Logout.create({ token });
  console.log(logout);
  res.status(200).send({
    message: "Success",
  });
};
