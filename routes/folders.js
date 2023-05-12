const express = require('express');
const router = express.Router();
const foldersCtrl = require('../controllers/folders');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /folders
router.get('/folders', foldersCtrl.index);

module.exports = router;