const Folder = require('../models/folder');
const User = require('../models/user');
const Material = require('../models/material')

module.exports = {
    index,
    new: newFolder,
    create,
    show,
    delete: deleteFolder,
    update,
    removeMaterial
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
    } catch(err) {
        console.log(err);
    }
    res.redirect('/folders');
}

async function show(req, res) {
    const folder = await Folder.findById(req.params.id);
    const folders = await Folder.find({ 'user': req.user._id });
    const materials = await Material.find({ 'user':req.user._id })

    const materialsInFolder = await Material.find({ _id: { $in: folder.materials } });
    
    res.render('folders/show', { title: 'Folder', folder, folders, materials, materialsInFolder });
}

async function deleteFolder(req, res) {
    await Folder.deleteOne({ _id: req.params.id });
    res.redirect('/folders')
}

async function update(req, res) {
    await Folder.updateOne({ _id: req.params.id }, req.body);
    res.redirect(`/folders/${req.params.id}`);
}

async function removeMaterial(req, res) {
    const { folderId, materialId } = req.params;
    try {
        const folder = await Folder.findById(folderId);
        if (!folder) {
            return res.status(404).json({ error: 'Folder not found' });
        }
        folder.materials.pull(materialId);
        await folder.save();
    } catch (err) {
        console.log(err)
    }
    res.redirect(`/folders/${folderId}`);
}