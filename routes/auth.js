const express = require('express');
const {protect} = require('../middleware/auth');

const { register , login, me, forgotPassword, resetPassword, updateProfile, updatePassword} = require('../controllers/auth');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:resettoken", resetPassword);
router.put("/update-profile/", protect, updateProfile);
router.put("/update-password/", protect, updatePassword);

module.exports = router;

