var express = require('express');
var router = express.Router();
const materialsCtrl = require('../controllers/materials');
const passport = require('passport');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /search
router.get('/search', materialsCtrl.search);
// GET /materials index
router.get('/materials', ensureLoggedIn, materialsCtrl.index);
// GET /materials/:id
router.get('/materials/:name', materialsCtrl.show);
// POST /materials (create)
router.post('/materials', ensureLoggedIn, materialsCtrl.save);
// associate materials with folders
router.post('/folders/:folderId/materials', ensureLoggedIn, materialsCtrl.addToFolder)
// DELETE /materials/:id
router.delete('/materials/:id', ensureLoggedIn, materialsCtrl.delete);

module.exports = router;