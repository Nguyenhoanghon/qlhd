const express = require('express')
//const router = express.Router()
//const verifyToken = require('../middleware/AuthJwt')
//const { authJwt } = require("../middleware");
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;


//Get all user
//@ Access Public
exports.getAllUsers = async (req,res) => { //[authJwt.verifyToken],
  try {
    const Users = await User.find().populate("roles", "-__v")
    res.json({ success: true, Users: Users }) 
    console.log(Users)

  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

//Get all user 
//@ Access Private
exports.getUsers = async (req,res) => { 
  try {
    const Users = await User.find().populate("roles", "-__v")
    res.json({ success: true, Users: Users }) 
    console.log(Users)

  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

exports.adduser = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "User" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

//Get user Login
//@ Access Private
exports.getUser_ById = async (req,res) => {
  try {
    //const Users = await User.find().populate("roles", "-__v")
    const Users = await User.findById(req.userId).populate("roles", "-__v")
    res.json({ success: true, Users: Users }) 
    console.log("Goi ham getUser_ById ", Users)

  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

//Get user Login
//@ Access Private

exports.insertUser = async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });
  console.log(user)

  user.save((err, userdata) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    //Check Exites???
    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => userdata._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "User" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          
          res.send({ message: "User was registered successfully!" });
        });
      });
    }
    
  });
  
};

// @route Delete localhost:5000/api/users/deleteUser/:id
// @access private
exports.deleteUser = async (req, res) => {
  console.log("Test route deleteUser !");
  console.log(req.params.id);
  try {
      const UserDeleteCondition = { _id: req.params.id}//, user: req.userId }
      const deletedUser= await User.findOneAndDelete(UserDeleteCondition)

      // User not authorised or User not found
      if (!deletedUser)
          return res.status(401).json({
              success: false,
              message: 'User not found or user not authorised'
          })

      res.json({ success: true, message: 'Delete User Successfull !'})
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

// @route Update  PUT localhost:5000/api/users/updateUser/:id
// @access private
exports.updateUser = async (req, res) => {
  console.log("Test route updateUser !");

  console.log("Test data recieved ====>>>",req.params.id)

  try {
      let updatedUser = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }
      
      const UpdateCondition = { _id: req.params.id}
      updatedUser = await User.findOneAndUpdate(
          UpdateCondition,
          updatedUser, { new: true }
      )
      // User not authorised to update User or User not found
      if (!updatedUser)
          return res.status(401).json({
              success: false,
              message: 'User not found or user not authorised'
          })
      else
          res.json({
              success: true,
              message: 'Update User Successfull !'
          })
      
  } catch (error) {
      console.log(error)
      res.status(400).json({ success: false, message: 'Internal server error' })
  }
}


//==================================Cac ham mo rong =====================================


//Get user By Role
//ok
exports.getUser_ByRole = async (req,res) => {
  try {
    //const Users = await User.find().populate("roles", "-__v")
    const roles = await Role.find({name:"Admin"}).populate("roles", "-__v");
    console.log(roles)
    const Users = await User.find({roles: roles.name}).populate("roles", "-__v")//{roles: '63952efa7e67486991d3cae2'}
    res.json({ success: true, Users: Users }) 
    //console.log("Goi ham getUser_ById ", Users)

  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


//Check routes and Roles 
exports.allAccess = async (req, res) => {
  res.status(200).send("Public Content.");
  
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.AMBoard = (req, res) => {
  res.status(200).send("AM Content.");
};

exports.ManagerBoard = (req, res) => {
  res.status(200).send("Manager Content.");
};

exports.DirectorBoard = (req, res) => {
  res.status(200).send("Director Content.");
};

exports.CEOBoard = (req, res) => {
  res.status(200).send("CEO Content.");
};

