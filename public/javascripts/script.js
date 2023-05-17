
$("#sketch-search").on("click", function() {
  let mol = sketcher.getMolecule();
  let molFile = ChemDoodle.writeMOL(mol);
  $("#molFile").val(molFile);
})

$("textarea").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
  }).on("input", function () {
    this.style.height = 0;
    this.style.height = (this.scrollHeight) + "px";
  });

// function getMol() {
//     let mol = sketcher.getMolecule();
//     let molFile = ChemDoodle.writeMOL(mol);
//     console.log(molFile);
  
//     getSMILES(molFile);
// }

// async function getSMILES(molFile) {
//     try {
//       const rdkit = await RDKitModule.load();
//       const mol = rdkit.get_mol(molFile);
//       const inchi = rdkit.MolToInchi(mol);
//       console.log(inchi);
//       rdkit.delete_mol(mol);
//       rdkit.delete();
//     } catch (err) {
//       console.error('An error occured:', err.message);
//     }
// }