var express = require('express');
var router = express.Router();
const materialsCtrl = require('../controllers/materials');
const passport = require('passport');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// get /search
router.get('/search', materialsCtrl.search);
// GET /materials/:id
router.get('/materials/:id', materialsCtrl.show);
// POST /materials (create)
router.post('/materials', ensureLoggedIn, materialsCtrl.save);

module.exports = router;