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
    search
}

async function search(req, res) {
    const search = req.query.q;
    const results = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${search}/cids/JSON`)
        .then(res => res.json())
        .catch(err => {
            console.error(err);
        });
    console.log(results);
    res.render('materials/search', { title: 'Search', results });
}