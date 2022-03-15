const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {
        const {name, email, password} = req.body;

        //check if all the data is filled
        if(!name || !email || !password) {
            res.status(400)
            throw new Error('Please add all fields')
        }

        // check if the user already exists
        const userExists = await User.findOne({email});
        if(userExists) {
            res.status(400)
            throw new Error('Such user already exists')
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // create user
        const user = await User.create({name, email, password: hashedPassword}) 

        // if user was created show json, otherwise throw an error
        if(user) {
            res.status(201).json({
                _id:user.id,
                name: user.name,
                email: user.email
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }

})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async(req, res) => {
    res.json({message:'login user'})
})

// @desc Get user data
// @route GET /api/users
// @access Public

const getMe = asyncHandler(async(req, res) => {
    res.json({message:'user data display'})
})


module.exports = {
    registerUser,
    loginUser,
    getMe
}