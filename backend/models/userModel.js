const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please add a user']
    },
    email:{
        type: String,
        required: [true, 'Please add an email']
    },
    password:{
        type: String,
        required: [true, 'Please add a password']
    }
},
    {timestamps: true} //for createdAt and updatedAt fields
);

module.exports = mongoose.model('User', userSchema);
