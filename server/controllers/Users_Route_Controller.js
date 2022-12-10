const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const User = require('../models/User_Model')

// @route GET api/Users
// @desc Get Users
// @access Public
router.get('/', verifyToken, async(req, res) => { //bỏ verifytoken thì view đc
    try {
        const Users = await User.find().populate('user', [ //xoa find({ user: req.userId })
            'username'
        ])
        res.json({ success: true, Users: Users })//note
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route User api/Users
// @desc Create User
// @access Private
router.post('/adduser', verifyToken, async(req, res) => {
    const { username, password, fullname, email, sex, roleId, role, status } = req.body

    // Simple validation
    if (!username || !password)
        return res
            .status(400)
            .json({ success: false, message: 'Missing username and/or password' })

    try {
        // Check for existing user
        const user = await User.findOne({ username })

        if (user)
            return res
                .status(400)
                .json({ success: false, message: 'Username already taken' })

        // All good
        const hashedPassword = await argon2.hash(password)
        const newUser = new User({ username, password: hashedPassword, fullname, email, sex, roleId, role, status })
        await newUser.save()

        // Return token
        const accessToken = jwt.sign({ userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        )

        res.json({
            success: true,
            message: 'User created successfully',
            User: newUser,
            accessToken
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route PUT api/Users
// @desc Update User
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const { username, password, fullname, email, sex, roleId, role, status } = req.body
    
    // Simple validation
    if (!username)
        return res
            .status(400)
            .json({ success: false, message: 'username is required' })

    try {
        const hashedPassword = await argon2.hash(password)//ma hoa password
        let updatedUser = {
            username,
            password: hashedPassword,
            fullname, 
            email, 
            sex, 
            roleId, 
            role, 
            status
        }
      
        const UserUpdateCondition = { _id: req.params.id }//bo , user: req.userId

        updatedUser = await User.findOneAndUpdate(
            UserUpdateCondition,
            updatedUser, { new: true }
        )

        // User not authorised to update User or User not found
        if (!updatedUser)
            return res.status(401).json({
                success: false,
                message: 'User not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Update successful!',
            User: updatedUser //note
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/Users
// @desc Delete User
// @access Private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const UserDeleteCondition = { _id: req.params.id }//xóa , user: req.userId
        const deletedUser = await User.findOneAndDelete(UserDeleteCondition)

        // User not authorised or User not found
        if (!deletedUser)
            return res.status(401).json({
                success: false,
                message: 'User not found or user not authorised'
            })

        res.json({ success: true, User: deletedUser }) //note
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router