import React, { useState } from "react";
import "./Exc.css"; // External CSS

export default function WordTools() {
  const [file, setFile] = useState(null);
  const [convertedType, setConvertedType] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");

  const converters = [
    { id: "pdf", title: "Word to PDF", desc: "Convert .doc or .docx file to PDF.", color: "#e74c3c" },
    { id: "text", title: "Word to Text", desc: "Extract plain text from Word document.", color: "#27ae60" },
    { id: "excel", title: "Word to Excel", desc: "Convert table data from Word to Excel.", color: "#f39c12" },
    { id: "html", title: "Word to HTML", desc: "Convert Word document to HTML format.", color: "#8e44ad" },
  ];

  const handleCardClick = (format) => {
    setSelectedFormat(format);
    document.getElementById("wordFileInput").click();
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !selectedFormat) return;

    setFile(selectedFile);
    setPreviewUrl(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    let endpoint = "";
    if (selectedFormat === "pdf") endpoint = "to-pdf";
    else if (selectedFormat === "text") endpoint = "to-text";
    else if (selectedFormat === "excel") endpoint = "to-excel";
    else if (selectedFormat === "html") endpoint = "to-html";

    try {
      const res = await fetch(`http://localhost:5000/api/words/${endpoint}`, {
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
    <div className="word-tools-container">
      <h2 className="page-title">Word Converter</h2>

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
        id="wordFileInput"
        type="file"
        accept=".doc,.docx"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✕
            </button>
            <h3>Converted File Preview</h3>

            {convertedType === "pdf" && (
              <iframe src={previewUrl} className="pdf-preview" title="PDF Preview" />
            )}

            {convertedType === "text" && (
              <iframe src={previewUrl} className="pdf-preview" title="Text Preview" />
            )}

            {convertedType === "html" && (
              <iframe src={previewUrl} className="pdf-preview" title="HTML Preview" />
            )}

            {!["pdf", "text", "html"].includes(convertedType) && (
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






























// import React, { useState } from "react";

// export default function WordTools() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   // 🔹 Upload and convert Word file
//   const callEndpoint = async (endpoint, filename, type) => {
//     if (!file) return alert("Please select a Word file.");
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/words/${endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       // Set preview
//       setPreviewUrl(url);
//       setConvertedType(type);
//       setShowModal(true);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🔹 Manual Download Button
//   const handleDownload = () => {
//     if (!previewUrl) return;
//     const link = document.createElement("a");

//     const ext = convertedType === "pdf"
//       ? "pdf"
//       : convertedType === "text"
//       ? "txt"
//       : convertedType === "excel"
//       ? "xlsx"
//       : "file";

//     link.href = previewUrl;
//     link.download = `converted.${ext}`;
//     link.click();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Word Tools</h2>
//       <input
//         type="file"
//         accept=".doc,.docx"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           <button
//             onClick={() => callEndpoint("to-pdf", "converted.pdf", "pdf")}
//             disabled={loading}
//           >
//             Convert to PDF
//           </button>

//           <button
//             onClick={() => callEndpoint("to-text", "converted.txt", "text")}
//             disabled={loading}
//             style={{ marginLeft: 8 }}
//           >
//             Convert to Text
//           </button>
//         </div>
//       )}

//       {/* Modal Preview */}
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
//             {/* Close Button */}
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

//             {convertedType === "pdf" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="PDF Preview"
//               />
//             )}

//             {convertedType === "text" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="Text Preview"
//               />
//             )}

//             {!["pdf", "text"].includes(convertedType) && (
//               <p>
//                 Preview not supported.{" "}
//                 <a href={previewUrl} download>
//                   Download File
//                 </a>
//               </p>
//             )}

//             {/* Manual Download Button */}
//             <div style={{ textAlign: "center", marginTop: 20 }}>
//               <button
//                 onClick={handleDownload}
//                 style={{
//                   padding: "10px 20px",
//                   background: "#4CAF50",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "5px",
//                   cursor: "pointer",
//                   fontSize: "16px",
//                 }}
//               >
//                 Download Converted File
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }










// import React, { useState } from "react";

// export default function WordTools() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const callEndpoint = async (endpoint, filename, type) => {
//     if (!file) return alert("Please select a Word file.");
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/words/${endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       // Set preview
//       setPreviewUrl(url);
//       setConvertedType(type);
//       setShowModal(true);

//       // Auto download
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = filename;
//       a.click();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Word Tools</h2>
//       <input
//         type="file"
//         accept=".doc,.docx"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           {/* Convert to PDF */}
//           <button
//             onClick={() => callEndpoint("to-pdf", "converted.pdf", "pdf")}
//             disabled={loading}
//           >
//             Convert to PDF
//           </button>

//           {/* Convert to TXT */}
//           <button
//             onClick={() => callEndpoint("to-text", "converted.txt", "text")}
//             disabled={loading}
//             style={{ marginLeft: 8 }}
//           >
//             Convert to Text
//           </button>

//           {/* Convert to Excel */}
//           {/* <button
//             onClick={() => callEndpoint("to-excel", "converted.xlsx", "excel")}
//             disabled={loading}
//             style={{ marginLeft: 8 }}
//           >
//             Convert to Excel
//           </button> */}
//         </div>
//       )}

//       {/* Modal Preview */}
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
//             {/* Close Button */}
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
//                 width: 30,
//                 height: 30,
//                 cursor: "pointer",
//               }}
//             >
//               ✕
//             </button>

//             <h3>Converted File Preview</h3>

//             {convertedType === "pdf" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="PDF Preview"
//               />
//             )}

//             {convertedType === "text" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="Text Preview"
//               />
//             )}

//             {convertedType === "excel" && (
//               <p>
//                 Excel preview not supported.{" "}
//                 <a href={previewUrl} download>
//                   Download File
//                 </a>
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import React, { useState } from "react";

// export default function WordTools() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const callEndpoint = async (endpoint, filename) => {
//     if (!file) return alert("Please select a Word file.");
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/words/${endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");
//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = filename;
//       a.click();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Word Tools</h2>
//             <input type="file" accept=".doc,.docx" onChange={(e) => setFile(e.target.files[0])} />

//       {file  &&(
//       <div style={{ marginTop: 12 }}>

//         { loading !== "pdf" &&(
            
//         <button onClick={() => callEndpoint("to-pdf", "converted.pdf")} disabled={loading}>
//           Convert to PDF
//         </button>
//         )}
//          { loading !== "text" &&(
//         <button onClick={() => callEndpoint("to-text", "converted.txt")} disabled={loading} style={{ marginLeft: 8 }}>
//           Convert to Text
//         </button>
// )}
//          {loading !=="excel" &&(
//         <button onClick={() => callEndpoint("to-excel","converted.xlsx")} disabled={loading} style={{ marginLeft: 8 }}>
//           Convert to Excel
//         </button>
//         )}
//       </div>
//       )}
//     </div>
//   );
// }
