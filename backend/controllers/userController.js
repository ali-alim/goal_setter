// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = (req, res) => {
    res.json({message:'register user'})
}

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public

const loginUser = (req, res) => {
    res.json({message:'login user'})
}

// @desc Get user data
// @route GET /api/users
// @access Public

const getMe = (req, res) => {
    res.json({message:'user data display'})
}


module.exports = {
    registerUser,
    loginUser,
    getMe
}