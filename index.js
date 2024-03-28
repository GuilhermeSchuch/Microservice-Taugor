require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

// Routes
const pdfRoutes = require("./routes/pdf/pdf");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/pdf", pdfRoutes);

app.listen(PORT, () => console.log(`Server runing on port: ${PORT}`));