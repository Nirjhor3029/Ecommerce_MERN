const express = require('express');

const router = express.Router();

//to generate token
const jwt = require('jsonwebtoken');
//encrypt password
const bcrypt = require('bcryptjs');
//check validation for request : input field
const {check,validationResult} = require('express-validator');
//get user image by email
const gravatar = require('gravatar');

//Models
const User = require('../models/user');

// @route   POST api/user/register
// @desc    Register User 
// @access  Public
router.post('/register',[
    //validation
    check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({
        min: 6
    }),
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    //get name,email & password from request
    const {name,email,password} = req.body;

    try {
        //Check if user already exist
        let user = await User.findOne({email});
        //If user exist
        if(user){
            return res.status(400).json({
                errors: [
                    {
                        msg: 'User already exist'
                    }
                ]
            });
        }

        //If not exist
        //get image from gravatar
        const avatar = gravatar.url(email,{
            size: '200',   //Size
            rating: 'pg',    //Rate
            default: 'mm',    //
        });

        
        //Create user object
        user = new User({
            name,email,password,avatar
        });


        const salt = await bcrypt.genSalt(10);  //generate salt contains 10
        user.password = await bcrypt.hash(password, salt);// use user password and salt to hash password

        //Save user in database
        await user.save();


        //payload to generate token
        const payload = {
            user:{
                id: user.id,
            }
        }

        jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn: 360000, //for production it will 3600
        },(err,token)=>{
            if(err) throw err;
            res.json({token});
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
});

module.exports = router;