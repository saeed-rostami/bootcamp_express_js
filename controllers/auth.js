const User = require("../models/User");
const ErrorResponse = require("../utilities/ErrorResponse");
const asyncHandler = require("../middleware/async");
const sendEmail = require("../utilities/emailing");


// @desc Register
// @route post /api/v1/auth/register
// @access public

exports.register = asyncHandler(async (req, res, next) => {

    const {name, email, password, role} = req.body;

    //   create user 
    const user = await User.create({
        name, email, password, role

    });

    //   create token 
    const token = user.getSignedJwtToken();

    res.status(200)
        .json({
            success: true,
            token

        });

});


// @desc Login
// @route post /api/v1/auth/login
// @access public

exports.login = asyncHandler(async (req, res, next) => {

    const {email, password} = req.body;

    // validation 
    if (!email || !password) {
        return next(new ErrorResponse('please enter email and password', 422))
    }

    //user
    const user = await User.findOne({email: email}).select('+password');

    if (!user) {
        return next(new ErrorResponse('invalid credentials', 404))
    }

    //   check password 
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse('password is incorrect', 422))
    }


    sendTokenResponse(user, 200, res)


});


// send token response;

const sendTokenResponse = (user, statusCode, res) => {
    //   create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),

        httpOnly: true
    };

    res
        .status(200)
        .cookie('token', token, options)
        .json({
            success: true,
            token

        });

}

// @desc me
// @route get /api/v1/auth/me
// @access private

exports.me = asyncHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id);
    res
        .status(200)
        .json({
            success: true,
            data: user,
        });
});


// @desc forgot-password
// @route post /api/v1/auth/forgot-password
// @access public

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
        return next(new ErrorResponse('nothing found any user', 422))
    }

    const resetToken =  user.getResetPasswordToken;

    await user.save({validateBeforeSave: false});

    const message = `Email Omad?`;

    try {
        await sendEmail({
            email : user.email,
            subject: 'email reset',
            message
        });

        
    res.status(200)
    .json({
        success: true,
    });

    }
    catch(err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorResponse('email could not send', 422))

    }


    res.status(200)
        .json({
            success: true,
            data: user,
        });

});