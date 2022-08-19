const { check } = require('express-validator');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }, 
    email:{
        type: String,
        required: true,
        unique: true, //unique email for each user
    },
    password:{
        type: String,
        required: true
    },
    avatar:{ //user image
        type: String,
    },
    role:{ // Role of user, it will be (normal or admin)
        type: Number,
        default:0
    },
    role:{ // Order history
        type: Array,
        default:[]
    },
}); 

const userRegValidation = [
    //validation
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6
    }),
];

const User = mongoose.model('User',UserSchema);

module.exports = {User,userRegValidation};