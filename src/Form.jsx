// MainTools.jsx
import React, { useState } from "react";
import ExcelTools from "./Excel";
import WordTools from "./Word";
import ImageTools from "./img";
import PdfTools from "./Pdf";
import "./FileConverterApp.css";

export default function MainTools() {
  const [selectedTool, setSelectedTool] = useState("all");

  const tools = [
    { key: "all", label: "All" },
    { key: "image", label: "Image" },
    { key: "excel", label: "Excel" },
    { key: "pdf", label: "PDF" },
    { key: "word", label: "Word" },
  ];

  return (
    <div>
      <h1 className="text-h">Every tool you need to work with PDFs in one place</h1>
      <p className="text-p">Every tool you need to use PDFs, at your fingertips. All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.</p>
      <div className="toolbar-buttons">
        {tools.map((tool) => (
          <button id="btn"
            key={tool.key}
            onClick={() => setSelectedTool(tool.key)}
            className={selectedTool === tool.key ? "active" : ""}
          >
            {tool.label}
          </button>
        ))}
      </div>

      <div className="tool-content">
        {(selectedTool === "all" || selectedTool === "image") && <ImageTools />}
      
        {(selectedTool === "all" || selectedTool === "word") && <WordTools />}
    
        {(selectedTool === "all" || selectedTool === "pdf") && <PdfTools />}

        {(selectedTool === "all" || selectedTool === "excel") && <ExcelTools />}
      </div>
    </div>
  );
}










