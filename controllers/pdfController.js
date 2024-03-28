const PDFDocument = require('pdfkit');

// Helpers
const { getCurrentDate, getEmployeeAge } = require("../helpers/dateHelpers");
const { dataToArray } = require("../helpers/arrayHelper");

const generatePdf = async (req, res) => {
  try {
    const { data } = req.body;

    if(!data) {
      return res.status(400).json({ message: "Algo deu errado..." });
    }

    const doc = new PDFDocument();
    
    doc.info.Title = `${data.name} ${data.lastname} - ${getCurrentDate().fullDate}`;

    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text(`${data.name} ${data.lastname}`, { paragraphGap: 10 });

    doc
      .fontSize(12)
      .font('Helvetica')
      .text(`Data de nascimento: ${data.birthday}, ${getEmployeeAge(data.birthday)}`, { paragraphGap: 5 }).fillColor("#282728")
      .text(`Endereço: ${data.address}`, { paragraphGap: 5 }).fillColor("#282728")
      .text(`Telefone: ${data.phone}`, { paragraphGap: 5 }).fillColor("#282728")
      .text(`Nacionalidade: ${data.nationality}`, { paragraphGap: 5 }).fillColor("#282728")
      .text(`E-mail: ${data.email}`, { paragraphGap: 30 }).fillColor("#282728");


    doc
    .fontSize(14)
    .font('Helvetica-Bold')
    .text(`FORMAÇÃO ACADÊMICA`, { paragraphGap: 8, align: "left" });

    data.education.forEach((education) => {
      doc
        .fontSize(12)
        .font('Helvetica')
        .text(`- ${education.course} - ${education.locationEducation} - ${education.dateEducation}`);
    });

    doc
    .fontSize(14)
    .font('Helvetica-Bold')
    .text(` `, { paragraphGap: 30 })
    .text(`EXPERIÊNCIA PROFISISONAL`, { align: "left" });

    // doc
    //   .moveTo(72, 315)
    //   .lineTo(550, 315)      
    //   .stroke();

    data.experiences.forEach((experience) => {
      doc
        .text(' ', { paragraphGap: 1 })
        .fontSize(12)
        .font('Helvetica-Bold')
        .text(`${experience.location}`)
        .font('Helvetica')
        .text(`Cargo: ${experience.position}`)
        .text(`Período: ${experience.date}`)
        .text(' ', { paragraphGap: 1 })
        .text(`${experience.aboutPosition}`)
    });

    doc
    .fontSize(14)
    .font('Helvetica-Bold')
    .text(` `, { paragraphGap: 30 })
    .text(`HABILIDADES`, { align: "left", paragraphGap: 1 });

    dataToArray(data.skills).forEach((skill) => {
      doc
      .fontSize(12)
      .font('Helvetica')
      .text(`- ${skill}`, { align: "left" });
    })

    doc
    .fontSize(14)
    .font('Helvetica-Bold')
    .text(` `, { paragraphGap: 30 })
    .text(`IDIOMAS`, { align: "left" });

    dataToArray(data.languages).forEach((language) => {
      doc
      .fontSize(12)
      .font('Helvetica')
      .text(`- ${language}`, { align: "left" });
    })
      
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

    doc.pipe(res);
    doc.end();

    return res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo deu errado, tente novamente mais tarde..." })
  }
}


module.exports = { generatePdf }