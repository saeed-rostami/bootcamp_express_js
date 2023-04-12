const express = require('express');

const {
    loge,
  } = require('../controllers/review');

const router = express.Router();

router.get('/log', loge);

module.exports = router;

