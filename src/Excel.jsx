
import React, { useState } from "react";
import "./Exc.css";

export default function ExcelTools() {
  const [file, setFile] = useState(null);
  const [convertedType, setConvertedType] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");

  const converters = [
    { id: "pdf", title: "Excel to PDF", desc: "Convert .xlsx file to PDF.", color: "#e74c3c" },
    { id: "csv", title: "Excel to CSV", desc: "Convert .xlsx file to CSV.", color: "#27ae60" },
  ];

  const handleCardClick = (format) => {
    setSelectedFormat(format);
    const inputEl = document.getElementById("excelFileInput");
    if (inputEl) {
      inputEl.click();
    } else {
      console.error("File input element not found!");
    }
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    console.log("Selected file:", selectedFile, "format:", selectedFormat);
    if (!selectedFile || !selectedFormat) return;

    setFile(selectedFile);
    setPreviewUrl(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    let endpoint = "";
    if (selectedFormat === "pdf") endpoint = "to-pdf";
    else if (selectedFormat === "csv") endpoint = "to-csv";
    else {
      alert("Unknown format: " + selectedFormat);
      return;
    }

    try {
      const res = await fetch(`https://myapp-production.up.railway.app/api/excel/${endpoint}`, {
        method: "POST",
        body: formData,
      });
      console.log("Fetch response status:", res.status);
      if (!res.ok) throw new Error("Conversion failed, status: " + res.status);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setPreviewUrl(url);
      setConvertedType(selectedFormat);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    } finally {
      e.target.value = null;
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    a.href = previewUrl;
    a.download = `converted.${convertedType}`;
    a.click();
  };

  return (
    <div className="word-tools-container">
      <h2 className="page-title">Excel Converter</h2>

      <div className="card-container">
        {converters.map((item) => (
          <div
            key={item.id}
            className="converter-card"
            onClick={() => handleCardClick(item.id)}
          >
            <div className="card-icon" style={{ backgroundColor: item.color }}>
              {item.id.toUpperCase()}
            </div>
            <h3 className="card-title">{item.title}</h3>
            <p className="card-desc">{item.desc}</p>
          </div>
        ))}
      </div>

      <input
        id="excelFileInput"
        type="file"
        accept=".xlsx"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            <h3>Converted File Preview</h3>

            {convertedType === "pdf" && (
              <iframe src={previewUrl} className="pdf-preview" title="PDF Preview" />
            )}

            {!["pdf", "html"].includes(convertedType) && (
              <p>
                Preview not supported.{" "}
                <a href={previewUrl} download>
                  Download File
                </a>
              </p>
            )}

            <div className="download-section">
              <button className="download-btn" onClick={handleDownload}>
                Download {convertedType.toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}





