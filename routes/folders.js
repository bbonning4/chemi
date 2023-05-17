const express = require('express');
const router = express.Router();
const foldersCtrl = require('../controllers/folders');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// GET /folders
router.get('/folders', ensureLoggedIn, foldersCtrl.index);
// GET /folders/new
router.get('/folders/new', ensureLoggedIn, foldersCtrl.new);
// GET /folders/:id
router.get('/folders/:id', ensureLoggedIn, foldersCtrl.show);

// POST /folders
router.post('/folders', ensureLoggedIn, foldersCtrl.create);

// DELETE /folders/:id
router.delete('/folders/:id', ensureLoggedIn, foldersCtrl.delete);
// DELETE /folders/:folderId/materials/:materialId
router.delete('/folders/:folderId/materials/:materialId', foldersCtrl.removeMaterial)

// PUT /folders/:id
router.put('/folders/:id', ensureLoggedIn, foldersCtrl.update);

module.exports = router;