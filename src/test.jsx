
import React, { useState } from "react";

export default function PdfConverter() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [convertedType, setConvertedType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const callEndpoint = async (endpoint, filename, type) => {
    if (!file) return alert("Please select a PDF file.");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/test/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      setPreviewUrl(url);
      setConvertedType(type);
      setShowModal(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!previewUrl) return;

    const link = document.createElement("a");
    let ext =
      convertedType === "image"
        ? "png"
        : convertedType === "text"
        ? "txt"
        : convertedType === "excel"
        ? "xlsx"
        : convertedType === "word"
        ? "docx"
        : "file";

    link.href = previewUrl;
    link.download = `converted.${ext}`;
    link.click();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>PDF Converter</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <div style={{ marginTop: 12 }}>
          <button
            onClick={() => callEndpoint("to-word", "converted.docx", "word")}
            disabled={loading}
          >
            Convert to Word
          </button>
          <button
            onClick={() => callEndpoint("to-text", "converted.txt", "text")}
            disabled={loading}
            style={{ marginLeft: 8 }}
          >
            Convert to Text
          </button>
          <button
            onClick={() => callEndpoint("to-image", "page-1.jpg", "image")}
            disabled={loading}
            style={{ marginLeft: 8 }}
          >
            Convert to Image
          </button>
          <button
            onClick={() => callEndpoint("to-excel", "converted.xlsx", "excel")}
            disabled={loading}
            style={{ marginLeft: 8 }}
          >
            Convert to Excel
          </button>
        </div>
      )}

      {/* Modal Preview */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: "80%",
              maxHeight: "80vh",
              overflow: "auto",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "red",
                color: "#fff",
                border: "none",
                borderRadius: "50%",
                width: 48,
                height: 40,
                cursor: "pointer",
              }}
            >
              ✕
            </button>

            <h3>Converted File Preview</h3>

            {/* Text preview */}
            {convertedType === "text" && (
              <iframe
                src={previewUrl}
                width="100%"
                height="500px"
                title="Text Preview"
              />
            )}

            {/* Image preview */}
            {convertedType === "image" && (
              <div style={{ textAlign: "center" }}>
                <img
                  src={previewUrl}
                  alt="PDF Page Preview"
                  style={{ maxWidth: "100%", maxHeight: "70vh" }}
                />
              </div>
            )}
            {/* Word Preview */}
            {convertedType === "word" &&(
               <iframe
                src={previewUrl}
                width="100%"
                height="500px"
                title="Text Preview"
              />
            )}





            {/* Word & Excel download button */}
            {["word", "excel" ,"image","text"].includes(convertedType) && (
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <p>Preview supported. Click below to download:</p>
                <button
                  onClick={handleDownload}
                  style={{
                    padding: "10px 20px",
                    background: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                >
                  Download {convertedType === "word" ? "Word" : "Excel"} File
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}



























// import React, { useState } from "react";

// export default function PdfConverter() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const callEndpoint = async (endpoint, filename, type) => {
//     if (!file) return alert("Please select a PDF file.");
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

//       // Auto download
//       // const a = document.createElement("a");
//       // a.href = url;
//       // a.download = filename;
//       // a.click();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   //manual Download Button 

//  const handleDownload = () => {
//   if (!previewUrl) return;
//   const link = document.createElement("a");

//   let ext =
//     convertedType === "pdf"
//       ? "pdf"
//       : convertedType === "text"
//       ? "txt"
//       : convertedType === "excel"
//       ? "xlsx"
//       : convertedType === "word"
//       ? "docx"
//       : "file";

//   link.href = previewUrl;
//   link.download = `converted.${ext}`;
//   link.click();
// };


//   return (
//     <div style={{ padding: 20 }}>
//       <h2>PDF Converter</h2>
//       <input
//         type="file"
//         accept=".pdf"
//         onChange={(e) => setFile(e.target.files[0])}
//       />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           <button onClick={() => callEndpoint("to-word", "converted.docx", "word")} disabled={loading}>
//             Convert to Word
//           </button>
//           <button onClick={() => callEndpoint("to-text", "converted.txt", "text")} disabled={loading} style={{ marginLeft: 8 }}>
//             Convert to Text
//           </button>
//           <button onClick={() => callEndpoint("to-image", "page-1.jpg", "image")} disabled={loading} style={{ marginLeft: 8 }}>
//             Convert to Image
//           </button>
//           <button onClick={() => callEndpoint("to-excel", "converted.xlsx", "excel")} disabled={loading} style={{ marginLeft: 8 }}>
//             Convert to Excel
//           </button>
//           {/* <button onClick={() => callEndpoint("to-ppt", "converted.pptx", "ppt")} disabled={loading} style={{ marginLeft: 8 }}>
//             Convert to PowerPoint
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

//             {convertedType === "text" && (
//               <iframe src={previewUrl} width="100%" height="500px" title="Text Preview" />
//             )}

//             {convertedType === "image" && (
//               <div style={{ textAlign: "center" }}>
//                 <img src={previewUrl} alt="PDF Page Preview" style={{ maxWidth: "100%", maxHeight: "70vh" }} />
//               </div>
//             )}
//             {convertedType === "word" && (
//               <iframe src ={previewUrl} width="100%" height="500px" title="Word Preview"/>
//             )}
            
//           {["word", "excel"].includes(convertedType) && (
//   <div style={{ textAlign: "center", marginTop: 20 }}>
//     <p>Preview not supported. Click below to download:</p>
//     <button
//       onClick={handleDownload}
//       style={{
//         padding: "10px 20px",
//         background: "#4CAF50",
//         color: "white",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//         fontSize: "16px",
//       }}
//     >
//       Download {convertedType === "word" ? "Word" : "Excel"} File
//     </button>
//   </div>
// )}









//           {!["word", "excel", "ppt"].includes(convertedType) && (
//   // <iframe
//   //   src={previewUrl}
//   //   width="100%"
//   //   height="500px"
//   //   title="File Preview"
//   //   style={{ border: "none" }}
//   // />
//    <p>
//                 Preview not supported.{" "}
//                 <a href={previewUrl} download>
//                   Download File
//                 </a>
//               </p>



// )}
//  {/* Manual Download Button */}
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
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

















// import React, { useState } from "react";

// export default function PdfConverter() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [previewText, setPreviewText] = useState("");
//   const [convertedType, setConvertedType] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const callApi = async (route, ext, type) => {
//     if (!file) return alert("Select a PDF first");
//     setLoading(true);
//     try {
//       const fd = new FormData();
//       fd.append("file", file);

//       const res = await fetch(`http://localhost:5000/api/test/${route}`, {
//         method: "POST",
//         body: fd,
//       });

//       if (!res.ok) {
//         const j = await res.json().catch(()=>null);
//         throw new Error(j?.error || j?.detail || "Conversion failed");
//       }

//       const blob = await res.blob();

//       // prepare preview and auto-download
//       if (type === "image") {
//         const url = URL.createObjectURL(blob);
//         setPreviewUrl(url);
//         setConvertedType(type);
//         setShowModal(true);
//         // auto-download
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `converted.${ext}`;
//         a.click();
//         URL.revokeObjectURL(url);
//       } else if (type === "word") {
//         // Word: show nothing textwise, make available to download and preview in iframe (some browsers can show docx)
//         const url = URL.createObjectURL(blob);
//         setPreviewUrl(url);
//         setConvertedType(type);
//         setShowModal(true);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `converted.${ext}`;
//         a.click();
//         URL.revokeObjectURL(url);
//       } else if (type === "excel") {
//         const url = URL.createObjectURL(blob);
//         setPreviewUrl(url);
//         setConvertedType(type);
//         setShowModal(true);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `converted.${ext}`;
//         a.click();
//         URL.revokeObjectURL(url);
//       }

//     } catch (err) {
//       alert("Error: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

  

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>PDF Converter (mini)</h2>
//       <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
//       <div style={{ marginTop: 12 }}>
//         <button onClick={() => callApi("pdf-to-word", "docx", "word")} disabled={loading}>PDF → Word</button>
//         <button onClick={() => callApi("pdf-to-excel", "xlsx", "excel")} disabled={loading} style={{ marginLeft: 8 }}>PDF → Excel</button>
//         <button onClick={() => callApi("pdf-to-image", "png", "image")} disabled={loading} style={{ marginLeft: 8 }}>PDF → Image</button>
//       </div>

//       {showModal && (
//         <div style={{
//           position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
//           background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center"
//         }}>
//           <div style={{ background: "#fff", padding: 20, width: "80%", maxHeight: "80vh", overflow: "auto", position: "relative" }}>
//             <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: 10, right: 10 }}>✕</button>
//             <h3>Preview</h3>
//             {convertedType === "image" && <img src={previewUrl} alt="preview" style={{ maxWidth: "100%" }} />}
//             {["word","excel"].includes(convertedType) && (
//               <iframe src={previewUrl} width="100%" height="500px" title="preview" />
//             )}

            
//           </div>

//         </div>
//       )}
      
//     </div>
//   );
// }

