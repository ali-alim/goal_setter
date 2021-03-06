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
                email: user.email,
                token: generateToken(user._id)
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
    //destruct
    const {email, password} = req.body;
    // search for user and assign the value
    const user = await User.findOne({email});
    //check the existance of user and compare the passwords for authentification
    if(user && (
        await bcrypt.compare(password, user.password)
    )) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// @desc Get user data
// @route GET /api/users
// @access Private

const getMe = asyncHandler(async(req, res) => {
    // const {_id, name, email} = await User.findById(req.user.id) // no reason to find the user again, we already got the user on the middleware

    res.status(200).json(req.user)
})


//generate JSON WEB TOKEN (JWT)
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}