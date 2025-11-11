// import React, { useState } from "react";

// export default function PdfConverter() {
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);
  
//   // Track selected file per conversion type
//   const [files, setFiles] = useState({
//     text: null,
//     image: null,
//     word: null,
//     excel: null,
//   });

//   const [selectedConversion, setSelectedConversion] = useState(""); // currently active conversion

//   const callEndpoint = async (endpoint, type) => {
//     const file = files[type];
//     if (!file) return alert("Please select a PDF file for this conversion.");
    
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/test/${endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       setPreviewUrl(url);
//       setConvertedType(type);
//       setShowModal(true);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDownload = () => {
//     if (!previewUrl) return;
//     const link = document.createElement("a");
//     const ext =
//       convertedType === "text"
//         ? "txt"
//         : convertedType === "image"
//         ? "jpg"
//         : convertedType === "word"
//         ? "docx"
//         : convertedType === "excel"
//         ? "xlsx"
//         : "file";
//     link.href = previewUrl;
//     link.download = `converted.${ext}`;
//     link.click();
//   };

//   const conversionOptions = [
//     { type: "text", label: "Convert to Text", endpoint: "to-text" },
//     { type: "image", label: "Convert to Image", endpoint: "to-image" },
//     { type: "word", label: "Convert to Word", endpoint: "to-word" },
//     { type: "excel", label: "Convert to Excel", endpoint: "to-excel" },
//   ];

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>PDF Converter</h2>

//       {/* Conversion type buttons */}
//       <div style={{ marginBottom: 12 }}>
//         {conversionOptions.map((option) => (
//           <button
//             key={option.type}
//             onClick={() => setSelectedConversion(option.type)}
//             style={{
//               marginRight: 8,
//               background: selectedConversion === option.type ? "#4CAF50" : "",
//               color: selectedConversion === option.type ? "#fff" : "",
//             }}
//           >
//             {option.label}
//           </button>
//         ))}
//       </div>

//       {/* File selection for the currently selected conversion type */}
//       {selectedConversion && (
//         <div style={{ marginBottom: 12 }}>
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={(e) =>
//               setFiles({ ...files, [selectedConversion]: e.target.files[0] })
//             }
//           />
//           {files[selectedConversion] && (
//             <div style={{ marginTop: 8 }}>
//               <button
//                 onClick={() => {
//                   const option = conversionOptions.find(
//                     (o) => o.type === selectedConversion
//                   );
//                   callEndpoint(option.endpoint, selectedConversion);
//                 }}
//                 disabled={loading}
//               >
//                 Convert
//               </button>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Modal preview */}
//       {showModal && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             background: "rgba(0,0,0,0.6)",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             zIndex: 1000,
//           }}
//         >
//           <div
//             style={{
//               background: "#fff",
//               padding: 20,
//               borderRadius: 8,
//               width: "80%",
//               maxHeight: "80vh",
//               overflow: "auto",
//               position: "relative",
//             }}
//           >
//             <button
//               onClick={() => setShowModal(false)}
//               style={{
//                 position: "absolute",
//                 top: 10,
//                 right: 10,
//                 background: "red",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: "50%",
//                 width: 48,
//                 height: 40,
//                 cursor: "pointer",
//               }}
//             >
//               ✕
//             </button>

//             <h3>Converted File Preview</h3>

//             {convertedType === "text" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="Text Preview"
//               />
//             )}

//             {convertedType === "image" && (
//               <div style={{ textAlign: "center" }}>
//                 <img
//                   src={previewUrl}
//                   alt="PDF Page Preview"
//                   style={{ maxWidth: "100%", maxHeight: "70vh" }}
//                 />
//               </div>
//             )}

//             {["word", "excel"].includes(convertedType) && (
//               <div style={{ textAlign: "center", marginTop: 20 }}>
//                 <p>Preview not supported. Click below to download:</p>
//                 <button
//                   onClick={handleDownload}
//                   style={{
//                     padding: "10px 20px",
//                     background: "#4CAF50",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "5px",
//                     cursor: "pointer",
//                     fontSize: "16px",
//                   }}
//                 >
//                   Download {convertedType === "word" ? "Word" : "Excel"} File
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import "./Exc.css"; // Using the same CSS as Image Converter

export default function PdfConverter() {
  const [files, setFiles] = useState({
    text: null,
    image: null,
    word: null,
    excel: null,
  });
  const [selectedConversion, setSelectedConversion] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [convertedType, setConvertedType] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const conversionOptions = [
    { type: "text", label: "PDF to Text", desc: "Convert PDF to Text file.", color: "#27ae60", endpoint: "to-text" },
    { type: "image", label: "PDF to Image", desc: "Convert PDF pages to images.", color: "#f39c12", endpoint: "to-image" },
    { type: "word", label: "PDF to Word", desc: "Convert PDF to Word document.", color: "#8e44ad", endpoint: "to-word" },
    { type: "excel", label: "PDF to Excel", desc: "Convert PDF tables to Excel.", color: "#e74c3c", endpoint: "to-excel" },
  ];

  const handleCardClick = (option) => {
    setSelectedConversion(option);
    document.getElementById("pdfFileInput").click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !selectedConversion) return;

    setFiles({ ...files, [selectedConversion.type]: selectedFile });
    setPreviewUrl(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/test/${selectedConversion.endpoint}`,
        { method: "POST", body: formData }
      );

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setPreviewUrl(url);
      setConvertedType(selectedConversion.type);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;
    const a = document.createElement("a");
    let ext =
      convertedType === "text"
        ? "txt"
        : convertedType === "image"
        ? "jpg"
        : convertedType === "word"
        ? "docx"
        : convertedType === "excel"
        ? "xlsx"
        : "file";
    a.href = previewUrl;
    a.download = `converted.${ext}`;
    a.click();
  };

  return (
    <div className="image-tools-container">
      <h2 className="page-title">PDF Converter</h2>

      <div className="card-container">
        {conversionOptions.map((option) => (
          <div
            key={option.type}
            className="converter-card"
            onClick={() => handleCardClick(option)}
          >
            <div className="card-icon" style={{ backgroundColor: option.color }}>
              {option.type.toUpperCase()}
            </div>
            <h3 className="card-title">{option.label}</h3>
            <p className="card-desc">{option.desc}</p>
          </div>
        ))}
      </div>

      <input
        id="pdfFileInput"
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
            <h3>Converted File Preview</h3>

            {convertedType === "text" && (
              <iframe src={previewUrl} title="Text Preview" className="pdf-preview" />
            )}
            {convertedType === "image" && (
              <img src={previewUrl} alt="PDF Preview" className="image-preview" />
            )}
            {["word", "excel"].includes(convertedType) && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <p>Preview not supported. Click below to download:</p>
                <button className="download-btn" onClick={handleDownload}>
                  Download {convertedType === "word" ? "Word" : "Excel"} File
                </button>
              </div>
            )}

            {["text", "image"].includes(convertedType) && (
              <div className="download-section">
                <button className="download-btn" onClick={handleDownload}>
                  Download {convertedType.toUpperCase()}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}







