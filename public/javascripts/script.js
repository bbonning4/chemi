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
