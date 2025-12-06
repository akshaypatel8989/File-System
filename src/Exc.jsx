import React, { useState } from "react";
import "./Exc.css"; // 👈 external CSS file

export default function ImageTools() {
  const [file, setFile] = useState(null);
  const [convertedType, setConvertedType] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");

  const converters = [
    { id: "png", title: "Image to PNG", desc: "Convert image to PNG format easily.", color: "#27ae60" },
    { id: "jpg", title: "Image to JPG", desc: "Convert image to JPG format.", color: "#f39c12" },
    { id: "svg", title: "Image to SVG", desc: "Convert image to SVG format.", color: "#8e44ad" },
    { id: "pdf", title: "Image to PDF", desc: "Convert image to PDF document.", color: "#e74c3c" },
  ];

  const handleCardClick = (format) => {
    setSelectedFormat(format);
    document.getElementById("fileInput").click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedFormat) return;

    setFile(file);
    setPreviewUrl(null);

    const formData = new FormData();
    formData.append("file", file);

    let endpoint = selectedFormat === "pdf" ? "to-pdf" : `convert?format=${selectedFormat}`;

    try {
      const res = await fetch(`https://myapp-production.up.railway.app/api/images/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setPreviewUrl(url);
      setConvertedType(selectedFormat);
      setShowModal(true);
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      e.target.value = "";
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
    <div className="image-tools-container">
      <h2 className="page-title">Image Converter</h2>

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
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            <h3>Converted File Preview</h3>

            {["png", "jpg", "svg", "webp"].includes(convertedType) && (
              <img src={previewUrl} alt="Converted" className="image-preview" />
            )}
            {convertedType === "pdf" && (
              <iframe src={previewUrl} title="PDF Preview" className="pdf-preview" />
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
