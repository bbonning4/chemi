const Folder = require('../models/folder');
const User = require('../models/user');

module.exports = {
    index,
    new: newFolder,
    create,
    show,
    delete: deleteFolder,
    update
}

async function index(req, res) {
    const folders = await Folder.find({ 'user': req.user._id });
    res.render('folders/index', { title: 'Folders', folders })
}

function newFolder(req, res) {
    res.render('folders/new', { title: 'New Folder' })
}

async function create(req, res) {
    const user = await User.findById(req.user._id);
    req.body.user = user;
    try {
        await Folder.create(req.body);
        // user.folders.push(folder._id);
        // await user.save();
    } catch(err) {
        console.log(err);
    }
    res.redirect('/folders');
}

async function show(req, res) {
    const folder = await Folder.findById(req.params.id);
    const folders = await Folder.find({ 'user': req.user._id });
    res.render('folders/show', { title: 'Folder', folder, folders });
}

async function deleteFolder(req, res) {
    // const user = await User.findOne({ '_id': req.user._id })
    // if(!user) return res.redirect('/folders');
    
    await Folder.deleteOne({ _id: req.params.id });
    
    // user.folders.remove(req.params.id);
    // await user.save();
    res.redirect('/folders')
}

async function update(req, res) {
    await Folder.updateOne({ _id: req.params.id }, req.body);
    res.redirect(`/folders/${req.params.id}`);
}