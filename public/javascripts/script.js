function getMol() {
    let mol = sketcher.getMolecule();
    let molFile = ChemDoodle.writeMOL(mol);
    let material = ChemDoodle.readMOL(molFile);
    console.log(molFile);
    myCanvas.loadMolecule(material);
    getSMILES(molFile);
}

function getSMILES(molFile) {
    // let mol = MolFromMolBlock(molFile);
    // const smiles = MolToSmiles(mol);
    console.log('SMILES: ');
}