import React, { useState } from "react";

export default function WordTools() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [convertedType, setConvertedType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const callEndpoint = async (endpoint, filename, type) => {
    if (!file) return alert("Please select a Word file.");
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/words/${endpoint}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Conversion failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Set preview
      setPreviewUrl(url);
      setConvertedType(type);
      setShowModal(true);

      // Auto download
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Word Tools</h2>
      <input
        type="file"
        accept=".doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {file && (
        <div style={{ marginTop: 12 }}>
          {/* Convert to PDF */}
          <button
            onClick={() => callEndpoint("to-pdf", "converted.pdf", "pdf")}
            disabled={loading}
          >
            Convert to PDF
          </button>

          {/* Convert to TXT */}
          <button
            onClick={() => callEndpoint("to-text", "converted.txt", "text")}
            disabled={loading}
            style={{ marginLeft: 8 }}
          >
            Convert to Text
          </button>

          {/* Convert to Excel */}
          {/* <button
            onClick={() => callEndpoint("to-excel", "converted.xlsx", "excel")}
            disabled={loading}
            style={{ marginLeft: 8 }}
          >
            Convert to Excel
          </button> */}
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
              ✕
            </button>

            <h3>Converted File Preview</h3>

            {convertedType === "pdf" && (
              <iframe
                src={previewUrl}
                width="100%"
                height="500px"
                title="PDF Preview"
              />
            )}

            {convertedType === "text" && (
              <iframe
                src={previewUrl}
                width="100%"
                height="500px"
                title="Text Preview"
              />
            )}

            {convertedType === "excel" && (
              <p>
                Excel preview not supported.{" "}
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
