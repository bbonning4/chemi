var express = require('express');
var router = express.Router();
const materialsCtrl = require('../controllers/materials');
const passport = require('passport');

// get /search
router.get('/search', materialsCtrl.search);

module.exports = router;