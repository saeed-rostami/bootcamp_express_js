const express = require('express');
const {protect} = require('../middleware/auth');

const { register , login, me} = require('../controllers/auth');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);

module.exports = router;

