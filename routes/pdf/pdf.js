const pdfRoutes = require("express").Router();
const { generatePdf, uploadImg } = require("../../controllers/pdfController");

pdfRoutes.post("/generate", generatePdf);
pdfRoutes.post("/uploadImg", uploadImg);

module.exports = pdfRoutes;