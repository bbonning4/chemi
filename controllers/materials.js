const Material = require('../models/material');
const Folder = require('../models/folder');
const User = require('../models/user');
const fetch = require('node-fetch');
const apiKey = process.env.API_KEY;
const ROOT_URL = 'https://api.rsc.org/compounds/v1';
const headers = {
    // 'X-ApiKey': apiKey,
    'Content-Type': 'application/json',
};

module.exports = {
    search,
    show,
    save
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
            res.render('materials/search', { title: 'Search', cid, imageBase64, req });
        })
        .catch(err => {
            console.error(err);
        });
}

function show(req, res) {

}

function save(req, res) {

}