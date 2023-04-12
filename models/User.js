const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please enter a name']
    },

    email : {
        type : String,
        required : [true, 'Please enter an email'],
        unique : true
    },


    role : {
        type : String,
        enum: ['user' , 'publisher'],
        default: 'user'
    },

    password : {
        type : String,
        required : [true, 'Please enter password'],
        minLength: 6,
        select : false,
    },

    resetPasswordToken : String,
    resetPasswordExpire : Date,

    created_at : {
        type : Date,
        default : Date.now
    }


});

module.exports = mongoose.model("User" , userSchema);