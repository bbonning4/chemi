const Material = require('../models/material');
const Folder = require('../models/folder');
const User = require('../models/user');
const fetch = require('node-fetch');
const OCL = require('openchemlib');
const parseString = require('xml2js').parseString;


module.exports = {
    search,
    sketchsearch,
    show,
    save,
    addToFolder,
    index,
    delete: deleteMat
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

async function sketchsearch(req, res) {
    try {
        const mol = OCL.Molecule.fromMolfile(req.query.molFile);
        const SMILES = mol.toIsomericSmiles();
    
        const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(SMILES)}/JSON`;
        const headers = {
            'Accept': 'application/json'
        }
    
        const response = await fetch(url, { headers })
        const contentType = response.headers.get('content-type');
    
        let data;
    
        if (contentType.includes('application/json')) {
            data = await response.json();
        } else if (contentType.includes('application/xml')) {
            const xmlText = await response.text();
            data = await parseXmlToJSON(xmlText);
        } else {
            throw new Error('Unexpected response format');
        }
    
        if (!data.PC_Compounds || !data.PC_Compounds[0].id.id) {
            return res.render('materials/search', { title: 'Search', cid:undefined, imageBase64:undefined, req });
        }
        const cid = data.PC_Compounds[0].id.id.cid;
        const compoundName = data.PC_Compounds[0].props.find(prop => prop.urn.label === 'IUPAC Name').value.sval;
        console.log('CID:', cid);
        console.log('Compound Name:', compoundName);
    
        const imgResponse = await fetch(`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/CID/${cid}/PNG`);
        const imgBuffer = await imgResponse.arrayBuffer();
        const imageBase64 = Buffer.from(imgBuffer).toString('base64');
    
        res.render('materials/search', { title: 'Search', cid, imageBase64, req, name: compoundName });
        
    } catch (err) {
        console.error(err);
    }

}

function parseXmlToJSON(xmlText) {
    return new Promise((resolve, reject) => {
        parseString(xmlText, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function show(req, res) {
    res.redirect(`/search?q=${req.params.name}`);
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

async function index(req, res) {
    // will render full list of saved 
    const materials = await Material.find({ user: req.user._id })
    res.render('materials/index', { title: 'Materials', materials });
}

async function deleteMat(req, res) {
    await Material.deleteOne({ _id: req.params.id });
    res.redirect('/materials');
}