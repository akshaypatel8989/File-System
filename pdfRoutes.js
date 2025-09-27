// pdfRouter.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";
import { Document, Packer, Paragraph } from "docx";
import ExcelJS from "exceljs";
import { convert } from "pdf-poppler";

const router = express.Router();
const UPLOAD_DIR = path.join(process.cwd(), "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const upload = multer({ dest: UPLOAD_DIR });

/* PDF -> Word (.docx) : sends .docx buffer */
router.post("/pdf-to-word", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);
    const doc = new Document({
      sections: [{
        properties: {},
        children: pdfData.text.split("\n").map(line => new Paragraph(line || " ")),
      }],
    });

    const buffer = await Packer.toBuffer(doc);

    // send as buffer (React will receive blob -> preview + download)
    res.setHeader("Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.send(buffer);
  } catch (err) {
    console.error("PDF->Word error:", err);
    res.status(500).json({ error: "PDF -> Word failed" });
  } finally {
    // cleanup uploaded file
    try { if (req?.file?.path) fs.unlinkSync(req.file.path); } catch {}
  }
});

/* PDF -> Excel (.xlsx) : sends .xlsx buffer */
router.post("/pdf-to-excel", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const dataBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(dataBuffer);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("PDF Data");

    // put each line as row (basic)
    pdfData.text.split("\n").forEach(line => sheet.addRow([line]));

    const outBuffer = await workbook.xlsx.writeBuffer();

    res.setHeader("Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.send(outBuffer);
  } catch (err) {
    console.error("PDF->Excel error:", err);
    res.status(500).json({ error: "PDF -> Excel failed" });
  } finally {
    try { if (req?.file?.path) fs.unlinkSync(req.file.path); } catch {}
  }
});

/* PDF -> Image (first page) : uses pdf-poppler to generate PNG and sends image bytes */
router.post("/pdf-to-image", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = path.resolve(req.file.path);
    const basename = `${Date.now()}_page`;
    const options = {
      format: "png",
      out_dir: UPLOAD_DIR,
      out_prefix: basename,
      page: 1 // only first page
    };

    await convert(filePath, options);

    // find generated file(s) start with basename
    const files = fs.readdirSync(UPLOAD_DIR).filter(f => f.startsWith(basename));
    if (!files.length) throw new Error("No image generated");
    const imagePath = path.join(UPLOAD_DIR, files[0]);

    const imageBuffer = fs.readFileSync(imagePath);
    res.setHeader("Content-Type", "image/png");
    res.send(imageBuffer);

    // cleanup
    try { fs.unlinkSync(imagePath); } catch {}
  } catch (err) {
    console.error("PDF->Image error:", err);
    res.status(500).json({ error: "PDF -> Image failed", detail: err.message });
  } finally {
    try { if (req?.file?.path) fs.unlinkSync(req.file.path); } catch {}
  }
});

export default router;




















// import express from "express";
// import multer from "multer";
// import fs from "fs";
// import path from "path";
// import pdfParse from "pdf-parse";
// import { Document, Packer, Paragraph } from "docx";

//  import ExcelJS from "exceljs";
//  import { fromPath } from "pdf2pic";
// import { convert } from "pdf-poppler";

// const router = express.Router();
// const UPLOAD_DIR = path.join(process.cwd(), "uploads");
// if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// const upload = multer({ dest: UPLOAD_DIR });

// // PDF → Word (.docx)
// router.post("/pdf-to-word", upload.single("file"), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: "No file uploaded" });

//     // Extract PDF text
//     const dataBuffer = fs.readFileSync(req.file.path);
//     const pdfData = await pdfParse(dataBuffer);

//     // Create Word document
//     const doc = new Document({
//       sections: [
//         {
//           properties: {},
//           children: pdfData.text.split("\n").map((line) => new Paragraph(line)),
//         },
//       ],
//     });

//     const outName = `${Date.now()}.docx`;
//     const outPath = path.join(UPLOAD_DIR, outName);

//     // Write Word file
//     const buffer = await Packer.toBuffer(doc);
//     fs.writeFileSync(outPath, buffer);

//     // Send file for download
//     res.download(outPath, () => {
//       try { fs.unlinkSync(outPath); } catch {}
//       try { fs.unlinkSync(req.file.path); } catch {}
//     });
//   } catch (err) {
//     console.error("PDF → Word error:", err);
//     res.status(500).json({ error: "Conversion failed" });
//   }
// });

// router.post("/pdf-to-excel", upload.single("file"), async (req, res) => {
//   try {
//     const dataBuffer = fs.readFileSync(req.file.path);
//     const pdfData = await pdfParse(dataBuffer);

//     const workbook = new ExcelJS.Workbook();
//     const sheet = workbook.addWorksheet("PDF Data");

//     pdfData.text.split("\n").forEach(line => {
//       sheet.addRow([line]);
//     });

//     const outName = `${Date.now()}.xlsx`;
//     const outPath = path.join(UPLOAD_DIR, outName);
//     await workbook.xlsx.writeFile(outPath);

//     res.download(outPath, () => {
//       try { fs.unlinkSync(outPath); } catch {}
//       try { fs.unlinkSync(req.file.path); } catch {}
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "PDF → Excel failed" });
//   }
// });

// /**
//  * PDF → Image (first page)
//  */
// router.post("/pdf-to-image", upload.single("file"), async (req, res) => {
//   try {
//     const filePath = req.file.path;
//     const convert = fromPath(filePath, {
//       density: 100,
//       savePath: UPLOAD_DIR,
//       format: "png",  // can also use "jpg"
//       width: 600,
//       height: 800,
//     });

//     const result = await convert(1); // first page only

//     res.sendFile(result.path, () => {
//       try { fs.unlinkSync(result.path); } catch {}
//       try { fs.unlinkSync(req.file.path); } catch {}
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "PDF → Image failed" });
//   }
// });

// export default router;
