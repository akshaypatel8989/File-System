import express from "express";
import cors from "cors";
import imageRoutes from "./routes/imageRoutes.js";
import wordRoutes from "./routes/wordRoutes.js";
import excelRoutes from "./routes/ExcalRoutes.js";
import pdfRoutes from "./routes/pdfRoutes.js";



const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/pdf",   pdfRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/words", wordRoutes);
app.use("/api/excel", excelRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});


app.get("/", (req, res) => {
  res.send("File Converter API is running...");
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});