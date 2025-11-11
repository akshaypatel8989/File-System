
// import React, { useState } from "react";

// export default function ExcelTools() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const upload = async (endpoint, filename, type) => {
//     if (!file) return alert("Please select an Excel file.");
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/excel/${endpoint}`, {
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
//       <h2>Excel Tools</h2>
//       <input
//         type="file"
//         accept=".xlsx,.xls"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           {/* Convert to CSV */}
//           <button
//             onClick={() => upload("to-csv", "converted.csv", "csv")}
//             disabled={loading}
//           >
//             Convert to CSV
//           </button>

//           {/* Convert to PDF */}
//           <button
//             onClick={() => upload("to-pdf", "converted.pdf", "pdf")}
//             disabled={loading}
//             style={{ marginLeft: 8 }}
//           >
//             Convert to PDF
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

//             {convertedType === "csv" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="CSV Preview"
//               />
//             )}

//             {!["pdf", "csv"].includes(convertedType) && (
//               <p>
//                 Preview not supported.{" "}
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

// export default function ExcelTools() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   // 🔹 Upload and convert Excel file
//   const upload = async (endpoint, filename, type) => {
//     if (!file) return alert("Please select an Excel file.");
//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/excel/${endpoint}`, {
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

//   // 🔹 Manual Download Button
//   const handleDownload = () => {
//     if (!previewUrl) return;
//     const link = document.createElement("a");

//     let ext = convertedType === "pdf" 
//     ? "pdf" 
//     : convertedType === "csv" 
//     ? "csv" 
//     : "file";

//     link.href = previewUrl;
//     link.download = `converted.${ext}`;
//     link.click();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Excel Tools</h2>
//       <input
//         type="file"
//         accept=".xlsx"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           <button
//             onClick={() => upload("to-csv", "converted.csv", "csv")}
//             disabled={loading}
//           >
//             Convert to CSV
//           </button>

//           <button
//             onClick={() => upload("to-pdf", "converted.pdf", "pdf")}
//             disabled={loading}
//             style={{ marginLeft: 8 }}
//           >
//             Convert to PDF
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

//             {/* {convertedType === "csv" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="CSV Preview"
//               />
//             )} */}

//             {/* Download Button */}
//             {/* <div style={{ textAlign: "center", marginTop: 20 }}>
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
//             </div> */}

//             {["pdf", "csv"].includes(convertedType) && (
//               // <p>
//               //   Preview not supported.{" "}
//               //   <a href={previewUrl} download>
//               //     Download File
//               //   </a>
//               // </p>

// <button
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
//                   Download {convertedType === "csv" ? "csv" : "pdf"} File
//                 </button>





//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import "./Exc.css";
// export default function ExcelTools() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedConversion, setSelectedConversion] = useState("");

//   const conversionOptions = [
//     { type: "csv", label: "Convert to CSV", color: "#f39c12", endpoint: "to-csv" },
//     { type: "pdf", label: "Convert to PDF", color: "#e74c3c", endpoint: "to-pdf" },
//   ];

//   const handleCardClick = (option) => {
//     setSelectedConversion(option);
//     document.getElementById("excelFileInput").click();
//   };

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile || !selectedConversion) return;

//     setFile(selectedFile);
//     setPreviewUrl(null);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/excel/${selectedConversion.endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       setPreviewUrl(url);
//       setConvertedType(selectedConversion.type);
//       setShowModal(true);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//       e.target.value = "";
//     }
//   };

//   const handleDownload = () => {
//     if (!previewUrl) return;
//     const link = document.createElement("a");
//     link.href = previewUrl;
//     link.download = `converted.${convertedType}`;
//     link.click();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2 style={{ textAlign: "center", marginBottom: 20 }}>Excel Converter</h2>

//       <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
//         {conversionOptions.map((option) => (
//           <div
//             key={option.type}
//             onClick={() => handleCardClick(option)}
//             style={{
//               cursor: "pointer",
//               padding: 20,
//               borderRadius: 12,
//               boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
//               width: 180,
//               textAlign: "center",
//               borderTop: `5px solid ${option.color}`,
//             }}
//           >
//             <h3>{option.label}</h3>
//           </div>
//         ))}
//       </div>

//       <input
//         id="excelFileInput"
//         type="file"
//         accept=".xlsx"
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />

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
//               borderRadius: 12,
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
//                 width: 36,
//                 height: 36,
//                 cursor: "pointer",
//                 fontSize: 18,
//               }}
//             >
//               ✕
//             </button>

//             <h3 style={{ textAlign: "center" }}>Converted File Preview</h3>

//             {convertedType === "pdf" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="400px"
//                 title="PDF Preview"
//                 style={{ borderRadius: 6, border: "1px solid #ccc" }}
//               />
//             )}

//             {!["pdf"].includes(convertedType) && (
//               <p style={{ textAlign: "center" }}>
//                 Preview not supported.
//               </p>
//             )}

//             <div style={{ textAlign: "center", marginTop: 20 }}>
//               <button
//                 onClick={handleDownload}
//                 style={{
//                   padding: "10px 20px",
//                   background: "#4CAF50",
//                   color: "white",
//                   border: "none",
//                   borderRadius: 6,
//                   cursor: "pointer",
//                   fontSize: 16,
//                 }}
//               >
//                 Download {convertedType.toUpperCase()} File
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";
// import "./Exc.css";

// export default function ExcelTools() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedConversion, setSelectedConversion] = useState("");

//   const conversionOptions = [
//     { type: "csv", label: "Convert to CSV", color: "#f39c12", endpoint: "to-csv" },
//     { type: "pdf", label: "Convert to PDF", color: "#e74c3c", endpoint: "to-pdf" },
//   ];

//   const handleCardClick = (option) => {
//     setSelectedConversion(option);
//     document.getElementById("excelFileInput").click();
//   };

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile || !selectedConversion) return;

//     setFile(selectedFile);
//     setPreviewUrl(null);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     setLoading(true);
//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/excel/${selectedConversion.endpoint}`,
//         { method: "POST", body: formData }
//       );

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       setPreviewUrl(url);
//       setConvertedType(selectedConversion.type);
//       setShowModal(true);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//       e.target.value = "";
//     }
//   };

//   const handleDownload = () => {
//     if (!previewUrl) return;
//     const link = document.createElement("a");
//     link.href = previewUrl;
//     link.download = `converted.${convertedType}`;
//     link.click();
//   };

//   return (
//     <div className="converter-container">
//       <h2 className="page-title">Excel Converter</h2>

//       <div className="card-container">
//         {conversionOptions.map((option) => (
//           <div
//             key={option.type}
//             className="converter-card"
//             onClick={() => handleCardClick(option)}
//             style={{ borderTop: `5px solid ${option.color}` }}
//           >
//             <h3 className="card-title">{option.label}</h3>
//           </div>
//         ))}
//       </div>

//       <input
//         id="excelFileInput"
//         type="file"
//         accept=".xlsx"
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
//             <h3 className="modal-title">Converted File Preview</h3>

//             {convertedType === "pdf" && (
//               <iframe src={previewUrl} title="PDF Preview" className="pdf-preview" />
//             )}

//             {!["pdf"].includes(convertedType) && (
//               <p style={{ textAlign: "center" }}>Preview not supported.</p>
//             )}

//             <div className="download-section">
//               <button className="download-btn" onClick={handleDownload}>
//                 Download {convertedType.toUpperCase()} File
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useState } from "react";
// import "./Exc.css"; // External CSS

// export default function WordTools() {
//   const [file, setFile] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedFormat, setSelectedFormat] = useState("");

//   const converters = [
//     { id: "pdf", title: "Excel to PDF", desc: "Convert .doc or .xlsx file to PDF.", color: "#e74c3c" },
//     { id: "csv", title: "Excle to CSV", desc: "Extract plain text from Word document.", color: "#27ae60" },
   
//   ];

//   const handleCardClick = (format) => {
//     setSelectedFormat(format);
//     document.getElementById("excelFileInput").click();
//   };

//   const handleFileChange = async (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile || !selectedFormat) return;

//     setFile(selectedFile);
//     setPreviewUrl(null);

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     let endpoint = "";
//     if (selectedFormat === "pdf") endpoint = "to-pdf";
//     else if (selectedFormat === "csv") endpoint = "to-csv";
//     else if (selectedFormat === "excel") endpoint = "to-excel";
//     else if (selectedFormat === "html") endpoint = "to-html";

//     try {
//       const res = await fetch(`http://localhost:5000/api/excel/${endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);

//       setPreviewUrl(url);
//       setConvertedType(selectedFormat);
//       setShowModal(true);
//     } catch (err) {
//       alert("Error: " + err.message);
//     } finally {
//       e.target.value = "";
//     }
//   };

//   const handleDownload = () => {
//     if (!previewUrl) return;
//     const a = document.createElement("a");
//     a.href = previewUrl;
//     a.download = `converted.${convertedType}`;
//     a.click();
//   };

//   return (
//     <div className="word-tools-container">
//       <h2 className="page-title">Excel Converter</h2>

//       <div className="card-container">
//         {converters.map((item) => (
//           <div
//             key={item.id}
//             className="converter-card"
//             onClick={() => handleCardClick(item.id)}
//           >
//             <div className="card-icon" style={{ backgroundColor: item.color }}>
//               {item.id.toUpperCase()}
//             </div>
//             <h3 className="card-title">{item.title}</h3>
//             <p className="card-desc">{item.desc}</p>
//           </div>
//         ))}
//       </div>

//       <input
//         id="wordFileInput"
//         type="file"
//         accept=".xlsx"
//         style={{ display: "none" }}
//         onChange={handleFileChange}
//       />

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <button className="close-btn" onClick={() => setShowModal(false)}>
//               ✕
//             </button>
//             <h3>Converted File Preview</h3>

//             {convertedType === "pdf" && (
//               <iframe src={previewUrl} className="pdf-preview" title="PDF Preview" />
//             )}

            

//             {convertedType === "html" && (
//               <iframe src={previewUrl} className="pdf-preview" title="HTML Preview" />
//             )}

//             {!["pdf", "text", "html"].includes(convertedType) && (
//               <p>
//                 Preview not supported.{" "}
//                 <a href={previewUrl} download>
//                   Download File
//                 </a>
//               </p>
//             )}

//             <div className="download-section">
//               <button className="download-btn" onClick={handleDownload}>
//                 Download {convertedType.toUpperCase()}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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
      const res = await fetch(`http://localhost:5000/api/excel/${endpoint}`, {
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





