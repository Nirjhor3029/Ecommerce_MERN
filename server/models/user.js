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

module.exports = User = mongoose.model('User',UserSchema);