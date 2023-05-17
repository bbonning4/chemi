const Material = require('../models/material');
const Folder = require('../models/folder');
const User = require('../models/user');
const fetch = require('node-fetch');
const { name } = require('ejs');
const apiKey = process.env.API_KEY;
const ROOT_URL = 'https://api.rsc.org/compounds/v1';

module.exports = {
    search,
    show,
    save,
    addToFolder
}

async function search(req, res) {
    const search = req.query.q;
    const results = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${search}/cids/JSON`)
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
    if (!results.IdentifierList) {
        return res.render('materials/search', { title: 'Search', cid:undefined, imageBase64:undefined, req });
    }
    const cid = results.IdentifierList.CID[0];
    const imgResult = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/CID/${cid}/PNG`)
    .then(res => res.arrayBuffer())    
    .then(buffer => {
            const imageBase64 = Buffer.from(buffer).toString('base64');
            res.render('materials/search', { title: 'Search', cid, imageBase64, req, name:search });
        })
        .catch(err => {
            console.error(err);
        });
}

function show(req, res) {

}

async function save(req, res) {
    const user = await User.findById(req.user._id);
    req.body.user = user;
    const compounds = await Material.find({ cid: req.body.cid, user: req.user._id })
    if (compounds.length) {
        return res.redirect(`/search?q=${req.body.name}`);
    }
    try {
        await Material.create(req.body);
    } catch(err) {
        console.log(err);
    }
    res.redirect(`/search?q=${req.body.name}`);
}

async function addToFolder(req, res) {
    const folder = await Folder.findById(req.params.folderId);
    const material = await Material.findOne({ 'name': req.body.name, 'user': req.user._id });
    folder.materials.push(material);
    await folder.save();
    res.redirect(`/folders/${folder._id}`);
}