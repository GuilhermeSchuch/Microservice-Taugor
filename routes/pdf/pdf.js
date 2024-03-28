const pdfRoutes = require("express").Router();
const { generatePdf } = require("../../controllers/pdfController");

pdfRoutes.post("/generate", generatePdf);

module.exports = pdfRoutes;