

// this is working with preview  without pdf convert 

// import React, { useState } from "react";

// export default function ImageTools() {
//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState("");
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   // 🔹 Upload and convert logic
//   const upload = async (endpoint, filename, type) => {
//     if (!file) return alert("Please select an image.");
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await fetch(`http://localhost:5000/api/images/${endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);

//       setPreviewUrl(url);
//       setConvertedType(type);
//       setShowModal(true);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // 🔹 Handle file input
//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);

//     if (uploadedFile) {
//       const ext = uploadedFile.name.split(".").pop().toLowerCase();
//       setFileType(ext);
//     }
//   };

//   // 🔹 Manual Download Button
//   const handleDownload = () => {
//     if (!previewUrl) return;
//     const link = document.createElement("a");
//     link.href = previewUrl;

//     // file name and extension
//     const ext =
//       convertedType === "pdf"
//         ? "pdf"
//         : convertedType === "image"
//         ? fileType
//         : "file";

//     link.download = `converted.${ext}`;
//     link.click();
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Image Tools</h2>

//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           {fileType !== "png" && (
//             <button
//               onClick={() => upload("convert?format=png", "converted.png", "image")}
//             >
//               Convert to PNG
//             </button>
//           )}

//           {fileType !== "jpg" && fileType !== "jpeg" && (
//             <button
//               onClick={() => upload("convert?format=jpg", "converted.jpg", "image")}
//               style={{ marginLeft: 8 }}
//             >
//               Convert to JPG
//             </button>
//           )}

//           {fileType !== "svg" && (
//             <button
//               onClick={() => upload("convert?format=svg", "converted.svg", "image")}
//               style={{ marginLeft: 8 }}
//             >
//               Convert to SVG
//             </button>
//           )}

//           {fileType !== "webp" && (
//             <button
//               onClick={() => upload("convert?format=webp", "converted.webp", "image")}
//               style={{ marginLeft: 8 }}
//             >
//               Convert to WebP
//             </button>
//           )}

//           <button
//             onClick={() => upload("to-pdf", "converted.pdf", "pdf")}
//             style={{ marginLeft: 8 }}
//           >
//             Convert to PDF
//           </button>
//         </div>
//       )}

//       {/* Modal for Preview */}
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

//             {convertedType === "image" && (
//               <img
//                 src={previewUrl}
//                 alt="Converted"
//                 style={{ maxWidth: "100%", borderRadius: 4 }}
//               />
//             )}

//             {convertedType === "pdf" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="PDF Preview"
//               />
//             )}

//             {/* Download Button */}
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

//             {!["image", "pdf"].includes(convertedType) && (
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



// old code of image converter   



// import React, { useState } from "react";

// export default function ImageTools() {
//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState("");
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const upload = async (endpoint, filename, type) => {
//     if (!file) return alert("Please select an image.");
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch(`http://localhost:5000/api/images/${endpoint}`, {
//       method: "POST",
//       body: formData,
//     });

//     const blob = await res.blob();
//     const url = URL.createObjectURL(blob)

    
//     setPreviewUrl(url);
//     setConvertedType(type);
//     setShowModal(true);

    
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = filename;
//     a.click();
//   };

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     setFile(uploadedFile);

//     if (uploadedFile) {
//       const ext = uploadedFile.name.split(".").pop().toLowerCase();
//       setFileType(ext);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Image Tools</h2>
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           {/* Hide PNG button if file is already PNG */}
//           {fileType !== "png" && (
//             <button
//               onClick={() => upload("convert?format=png", "converted.png", "image")}
//             >
//               Convert to PNG
//             </button>
//           )}

//           {/* Hide JPG button if file is already JPG or JPEG */}
//           {fileType !== "jpg" && fileType !== "jpeg" && (
//             <button
//               onClick={() => upload("convert?format=jpg", "converted.jpg", "image")}
//               style={{ marginLeft: 8 }}
//             >
//               Convert to JPG
//             </button>
//           )}

//           {/* Convert to SVG */}
//           {fileType !== "svg" && (
//             <button
//               onClick={() => upload("convert?format=svg", "converted.svg", "image")}
//               style={{ marginLeft: 8 }}
//             >
//               Convert to SVG
//             </button>
//           )}
//         {/* Convert to Web */}
//             {fileType !== "webp" && (
//             <button
//               onClick={() => upload("convert?format=webp", "converted.webp", "image")}
//               style={{ marginLeft: 8 }}
//             >
//               Convert to Webp
//             </button>
//           )}

//           {/* Always allow image → PDF */}
//           <button
//             onClick={() => upload("to-pdf", "converted.pdf", "pdf")}
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
          
//             </button>

//             <h3>Converted File Preview</h3>

//             {convertedType === "image" && (
//               <img
//                 src={previewUrl}
//                 alt="Converted"
//                 style={{ maxWidth: "100%", borderRadius: 4 }}
//               />
//             )}

//             {convertedType === "pdf" && (
//               <iframe
//                 src={previewUrl}
//                 width="100%"
//                 height="500px"
//                 title="PDF Preview"
//               />
//             )}

//             {!["image", "pdf"].includes(convertedType) && (
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

// export default function ImageTools() {
//   const [file, setFile] = useState(null);
//   const [fileType, setFileType] = useState("");
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const handleFileChange = (e) => {
//     const uploadedFile = e.target.files[0];
//     if (!uploadedFile) return;

//     setFile(uploadedFile);
//     const ext = uploadedFile.name.split(".").pop().toLowerCase();
//     setFileType(ext);
//     setPreviewUrl(null);
//     setConvertedType("");
//   };

//   const convertFile = async (targetFormat) => {
//     if (!file) return alert("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("format", targetFormat); // Backend reads this

//     try {
//       const res = await fetch(`http://localhost:5000/api/images/convert`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = URL.createObjectURL(blob);

//       setPreviewUrl(url);
//       setConvertedType(targetFormat);
//       setShowModal(true);
//     } catch (err) {
//       alert(err.message);
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
//     <div style={{ padding: 20 }}>
//       <h2>File Converter</h2>
//       <input type="file" accept="image/*" onChange={handleFileChange} />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           {fileType !== "png" && <button onClick={() => convertFile("png")}>Convert to PNG</button>}
//           {fileType !== "jpg" && fileType !== "jpeg" && <button onClick={() => convertFile("jpg")} style={{ marginLeft: 8 }}>Convert to JPG</button>}
//           {fileType !== "webp" && <button onClick={() => convertFile("webp")} style={{ marginLeft: 8 }}>Convert to WebP</button>}
//           {fileType !== "svg" && <button onClick={() => convertFile("svg")} style={{ marginLeft: 8 }}>Convert to SVG</button>}
//           <button onClick={() => convertFile("pdf")} style={{ marginLeft: 8 }}>Convert to PDF</button>
//         </div>
//       )}

//       {showModal && (
//         <div style={{
//           position: "fixed", top: 0, left: 0,
//           width: "100vw", height: "100vh",
//           background: "rgba(0,0,0,0.6)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           zIndex: 1000
//         }}>
//           <div style={{
//             background: "#fff",
//             padding: 20,
//             borderRadius: 8,
//             width: "80%",
//             maxHeight: "80vh",
//             overflow: "auto",
//             position: "relative"
//           }}>
//             <button onClick={() => setShowModal(false)} style={{
//               position: "absolute",
//               top: 10,
//               right: 10,
//               background: "red",
//               color: "#fff",
//               border: "none",
//               borderRadius: "50%",
//               width: 30,
//               height: 30,
//               cursor: "pointer"
//             }}>✕</button>

//             <h3>Converted File Preview</h3>

//             {["png", "jpg", "webp", "svg"].includes(convertedType) && (
//               <img src={previewUrl} alt="Converted" style={{ maxWidth: "100%", borderRadius: 4 }} />
//             )}

//             {convertedType === "pdf" && (
//               <iframe src={previewUrl} width="100%" height="500px" title="PDF Preview" />
//             )}

//             <div style={{ textAlign: "center", marginTop: 20 }}>
//               <button onClick={handleDownload} style={{
//                 padding: "10px 20px",
//                 background: "#4CAF50",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 5,
//                 cursor: "pointer",
//                 fontSize: 16
//               }}>
//                 Download File
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




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
      const res = await fetch(`http://localhost:5000/api/images/${endpoint}`, {
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


