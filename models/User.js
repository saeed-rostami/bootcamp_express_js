const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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

// Ecrypt password 
userSchema.pre('save' , async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});


// sign jwt token
userSchema.methods.getSignedJwtToken = function() {

    return jwt.sign({id: this._id},
         process.env.JWT_SECRET,
    {expiresIn: process.env.JWT_EXPIRE}
    )
};

// check password validation
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

module.exports = mongoose.model("User" , userSchema);