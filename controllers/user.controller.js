const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET } = process.env;
module.exports.signup = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (user) {
      return res.status(400).json({
        msg: "user already exists"
      });
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(400).json({
          message: "error"
        });
      }
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
        .then(user => {
          var token = jwt.sign(
            {
              id: user.id,
              name: user.name,
              email: user.email
            },
            SECRET
          );
          res.status(200).json({
            message: "success",
            name: user.name,
            access_token: "Bearer " + token
          });
        })
        .catch(err => {
          console.log(err);
          res.status(400).json({
            msg: "error"
          });
        });
    });
  });
};

module.exports.login = (req, res) => {
  User.findOne({ where: {
    email: req.body.email
  } }).then(user => {
    if(!user) {
      return res.status(400).json({
        msg: "Either email or password is wrong"
      })
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({
          msg: "Error"
        });
      }
      if (result) {
        const token = jwt.sign({
          id: user.id,
          name: user.name,
          email: user.email
        }, SECRET);
        res.status(200).json({
          msg: "user logged in successfully",
          access_token: "Bearer " + token
        })
      } else {
        return res.status(400).json({
          msg: "Either email or password is wrong"
        })
      }
    });
  })
};
