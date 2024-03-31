const PDFDocument = require('pdfkit');
const fs = require('fs');

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

    const base64Image = data.profilePic;

    if(base64Image) {
      const imageData = base64Image.split(';base64,').pop();
      
      doc.image(Buffer.from(imageData, 'base64'), {
        width: 75,
        height: 125,
      });

      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text(`${data.name} ${data.lastname}`, 170, 70, { paragraphGap: 10 });
    }
    else {
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text(`${data.name} ${data.lastname}`, { paragraphGap: 10 });
    }


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
    .text(`FORMAÇÃO ACADÊMICA`, 70, 230, { paragraphGap: 8, align: "left" });

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

const uploadImg = async (req, res) => {
  try {
    const { image } = req.body;

    console.log(image);

    if(!image) {
      return res.status(400).json({ message: "Algo deu errado..." });
    }

    const imageData = image.split(';base64,').pop();
    const imageName = `image_${Date.now()}.png`;
    const imagePath = `/public/imgs/${imageName}`;

    // fs.writeFile(imagePath, imageData, { encoding: 'base64' }, (err) => {
    //   if(err) {
    //     console.error('Error saving image:', err);
    //     return res.status(500).send('Error saving image');
    //   }
    //   else {
    //     console.log('Image saved successfully:', imageName);
    //     return res.status(200).json({img: imageData});
    //   }
    // });

    

    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo deu errado, tente novamente mais tarde..." })
  }
}


module.exports = { generatePdf, uploadImg }