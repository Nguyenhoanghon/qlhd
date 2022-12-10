const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/AuthJwt')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Role = db.role;

exports.getUsers = async (req,res) => {
  try {
    const Users = await User.find().populate('user', ['username'])
    res.json({ success: true, Users: Users })
    console.log("Data user", Users);  
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

exports.getUser = async (req,res) => {
  try {
    const Users = await User.find().populate('user', ['username'])
    //const Users = await User.find().populate("roles", "-__v")
    
    res.json({ success: true, Users: Users })//note
    console.log("Data user", Users[0].roles[0]);

    const Roles = await Role.findById(Users[0].roles[0]).select("-password");
    if (!Roles)
    {
      res.json({ success: true, Roles: Roles });
      
    }
    console.log("truy van roless",Roles);
    
    const dataUsers = [];


    /*
    res.json({
      success: true,
      id: User._id,
      username: User.username,
      email: User.email,
      roles: authorities
    });
    */
    
  } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

//Check routes and Roles 
exports.allAccess = (req, res) => {
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

