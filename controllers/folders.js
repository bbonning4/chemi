const Folder = require('../models/folder');

module.exports = {
    index
}

async function index(req, res) {
    const folders = await Folder.find({});
    res.render('folders/index', { title: 'Folders', folders })
}