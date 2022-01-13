const express = require('express');
const router = express.Router();

const indexPostController = require('../controllers/waitlist/post');

router.post(
  '/', 
    indexPostController
);

module.exports = router;
