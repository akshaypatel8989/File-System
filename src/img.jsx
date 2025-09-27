
import React, { useState } from "react";

export default function ImageTools() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [convertedType, setConvertedType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const upload = async (endpoint, filename, type) => {
    if (!file) return alert("Please select an image.");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://localhost:5000/api/images/${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob)

    
    setPreviewUrl(url);
    setConvertedType(type);
    setShowModal(true);

    
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile) {
      const ext = uploadedFile.name.split(".").pop().toLowerCase();
      setFileType(ext);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Image Tools</h2>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {file && (
        <div style={{ marginTop: 12 }}>
          {/* Hide PNG button if file is already PNG */}
          {fileType !== "png" && (
            <button
              onClick={() => upload("convert?format=png", "converted.png", "image")}
            >
              Convert to PNG
            </button>
          )}

          {/* Hide JPG button if file is already JPG or JPEG */}
          {fileType !== "jpg" && fileType !== "jpeg" && (
            <button
              onClick={() => upload("convert?format=jpg", "converted.jpg", "image")}
              style={{ marginLeft: 8 }}
            >
              Convert to JPG
            </button>
          )}

          {/* Convert to SVG */}
          {fileType !== "svg" && (
            <button
              onClick={() => upload("convert?format=svg", "converted.svg", "image")}
              style={{ marginLeft: 8 }}
            >
              Convert to SVG
            </button>
          )}
        {/* Convert to Web */}
            {fileType !== "webp" && (
            <button
              onClick={() => upload("convert?format=webp", "converted.webp", "image")}
              style={{ marginLeft: 8 }}
            >
              Convert to Webp
            </button>
          )}

          {/* Always allow image → PDF */}
          <button
            onClick={() => upload("to-pdf", "converted.pdf", "pdf")}
            style={{ marginLeft: 8 }}
          >
            Convert to PDF
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
            {/* Close Button */}
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
                width: 30,
                height: 30,
                cursor: "pointer",
              }}
            >
          
            </button>

            <h3>Converted File Preview</h3>

            {convertedType === "image" && (
              <img
                src={previewUrl}
                alt="Converted"
                style={{ maxWidth: "100%", borderRadius: 4 }}
              />
            )}

            {convertedType === "pdf" && (
              <iframe
                src={previewUrl}
                width="100%"
                height="500px"
                title="PDF Preview"
              />
            )}

            {!["image", "pdf"].includes(convertedType) && (
              <p>
                Preview not supported.{" "}
                <a href={previewUrl} download>
                  Download File
                </a>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}





//this is ok to run




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
//     const url = URL.createObjectURL(blob);

//     // Set preview state
//     setPreviewUrl(url);
//     setConvertedType(type);
//     setShowModal(true);

//     // Still download automatically
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

//   const upload = async (endpoint, filename) => {
//     if (!file) return alert("Please select an image.");
//     const formData = new FormData();
//     formData.append("file", file);

//     const res = await fetch(`http://localhost:5000/api/images/${endpoint}`, {
//       method: "POST",
//       body: formData,
//     });
//     const blob = await res.blob();
//     const url = URL.createObjectURL(blob);
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
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//       />

//       {file && (
//         <div style={{ marginTop: 12 }}>
//           {/* Hide PNG button if file is already PNG */}
//           {fileType !== "png" && (
//             <button onClick={() => upload("convert?format=png", "converted.png")}>
//               Convert to PNG
//             </button>
//           )}

//           {/* Hide JPG button if file is already JPG or JPEG */}
//           {fileType !== "jpg" && fileType !== "jpeg" && (
//             <button
//               onClick={() => upload("convert?format=jpg", "converted.jpg")}
//               style={{ marginLeft: 8 }}
//             >
//               Convert to JPG
//             </button>
//           )}

//           {/* Always allow image → PDF */}
//           {fileType !== "svg" && fileType !== "jpeg" && (
//             <button
//               onClick={() => upload("convert?format=svg", "converted.svg")}
//               style={{ marginLeft: 8 }}
//             >
//               Convert to Svg
//             </button>
//           )}
//           <button
//             onClick={() => upload("to-pdf", "converted.pdf")}
//             style={{ marginLeft: 8 }}
//           >
//             Convert to PDF
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
