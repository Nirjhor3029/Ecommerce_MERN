//to generate token
const jwt = require('jsonwebtoken');
//encrypt password
const bcrypt = require('bcryptjs');
//check validation for request : input field
const { validationResult } = require('express-validator');
//get user image by email
const gravatar = require('gravatar');

//Models
const { User } = require('../models/user');
const { serverError } = require('../helpers/helper');

const expiresIn = (process.env.NODE_ENV == "development")? 360000 : 3600; // in production it will 3600

// @route   POST api/user/register
// @desc    Register User 
// @access  Public
const register_post = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    //get name,email & password from request
    const { name, email, password } = req.body;

    try {
        //Check if user already exist
        let user = await User.findOne({ email });
        //If user exist
        if (user) {
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
        const avatar = gravatar.url(email, {
            size: '200',   //Size
            rating: 'pg',    //Rate
            default: 'mm',    //
        });


        //Create user object
        user = new User({
            name, email, password, avatar
        });


        const salt = await bcrypt.genSalt(10);  //generate salt contains 10
        user.password = await bcrypt.hash(password, salt);// use user password and salt to hash password

        //Save user in database
        await user.save();


        //payload to generate token
        const payload = {
            user: {
                id: user.id,
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:expiresIn}, (err, token) => {
            if (err) throw err;
            res.json({ token });
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json('Server Error');
    }
}

// @route   POST api/user/login
// @desc    Login User 
// @access  Public
const login_post = async (req, res) => {
    const validationErrs = validationResult(req);
    
    //if any validation error
    if (!validationErrs.isEmpty()) {
        return res.status(400).json({
            errors: validationErrs.array()
        });
    }
    

    //get user data from request
    const { email, password } = req.body;

    //find user from database
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            });
        }

        //know user founded by email let's compare the password
        // console.log(password);
        const isMatch = await bcrypt.compare(password,user.password);
        
        // if password don't match
        if(!isMatch){
            return res.status(400).json({
                errors: [{
                    msg: 'Invalid Credentials'
                }]
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:expiresIn},(err,token)=>{
            if(err) throw err;
            return res.json({ token});
        })
        console.log(payload);
        // return res.json({payload});
    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Server Error');
    }
}

const getUser_get = async (req, res) => {
    try {
        //get user information
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        serverError(res,error,'Server error');
    }
}


module.exports = { register_post, login_post, getUser_get }