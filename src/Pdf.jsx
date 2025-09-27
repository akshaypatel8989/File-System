import React, { useState } from "react";

export default function PdfConverter() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewText, setPreviewText] = useState("");
  const [convertedType, setConvertedType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const callApi = async (route, ext, type) => {
    if (!file) return alert("Select a PDF first");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch(`http://localhost:5000/api/pdf/${route}`, {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const j = await res.json().catch(()=>null);
        throw new Error(j?.error || j?.detail || "Conversion failed");
      }

      const blob = await res.blob();

      // prepare preview and auto-download
      if (type === "image") {
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setConvertedType(type);
        setShowModal(true);
        // auto-download
        const a = document.createElement("a");
        a.href = url;
        a.download = `converted.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
      } else if (type === "word") {
        // Word: show nothing textwise, make available to download and preview in iframe (some browsers can show docx)
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setConvertedType(type);
        setShowModal(true);
        const a = document.createElement("a");
        a.href = url;
        a.download = `converted.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
      } else if (type === "excel") {
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
        setConvertedType(type);
        setShowModal(true);
        const a = document.createElement("a");
        a.href = url;
        a.download = `converted.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
      }

    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>PDF Converter (mini)</h2>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
      <div style={{ marginTop: 12 }}>
        <button onClick={() => callApi("pdf-to-word", "docx", "word")} disabled={loading}>PDF → Word</button>
        <button onClick={() => callApi("pdf-to-excel", "xlsx", "excel")} disabled={loading} style={{ marginLeft: 8 }}>PDF → Excel</button>
        <button onClick={() => callApi("pdf-to-image", "png", "image")} disabled={loading} style={{ marginLeft: 8 }}>PDF → Image</button>
      </div>

      {showModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", padding: 20, width: "80%", maxHeight: "80vh", overflow: "auto", position: "relative" }}>
            <button onClick={() => setShowModal(false)} style={{ position: "absolute", top: 10, right: 10 }}>✕</button>
            <h3>Preview</h3>
            {convertedType === "image" && <img src={previewUrl} alt="preview" style={{ maxWidth: "100%" }} />}
            {["word","excel"].includes(convertedType) && (
              <iframe src={previewUrl} width="100%" height="500px" title="preview" />
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
//     const [previewUrl, setPreviewUrl] = useState(null);
//     const [convertedType, setConvertedType] = useState("");
//     const [showModal, setShowModal] = useState(false);
  
   
//   const convertPdf = async ( endpoint,filename,type) => {
//     if (!file) return alert("Please select a PDF file.");
//    const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/pdf/pdf-to-${endpoint}`, {
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
//       a.download =
//         type === "word" ? "converted.docx" :
//         type === "excel" ? "converted.xlsx" :
//         "converted.png";
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>PDF Converter</h2>
//       <input
//         type="file"
//         accept=".pdf"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <br /><br />
//       <button onClick={() => convertPdf("word")} disabled={loading || !file}>
//         Convert to Word
//       </button>
//       <button
//         onClick={() => convertPdf("excel")}
//         disabled={loading || !file}
//         style={{ marginLeft: 8 }}
//       >
//         Convert to Excel
//       </button>
//       <button
//         onClick={() => convertPdf("image")}
//         disabled={loading || !file}
//         style={{ marginLeft: 8 }}
//       >
//         Convert to Image
//       </button>


//       <h4>Pdf Preview</h4>
//       {convertedType === "word" && (
//         <iframe src={previewUrl}
//         width='100%'
//         height='500px'
//         title='PDF Preview'/>
//       )}
//     </div>
//   );
// }

// import React, { useState } from "react";

// export default function PdfConverter() {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
  

//   const convertPdf = async (type) => {
//     if (!file) return alert("Please select a PDF file.");

//     const formData = new FormData();
//     formData.append("file", file);

//     setLoading(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/pdf/pdf-to-${type}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Conversion failed");

//       const blob = await res.blob();
//       const url = window.URL.createObjectURL(blob);

//       // Auto download
//       const a = document.createElement("a");
//       a.href = url;
//       a.download =
//         type === "word" ? "converted.docx" :
//         type === "excel" ? "converted.xlsx" :
//         "converted.png";
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>PDF Converter</h2>
//       <input
//         type="file"
//         accept=".pdf"
//         onChange={(e) => setFile(e.target.files[0])}
//       />
//       <br /><br />
//       <button onClick={() => convertPdf("word")} disabled={loading || !file}>
//         Convert to Word
//       </button>
//       <button
//         onClick={() => convertPdf("excel")}
//         disabled={loading || !file}
//         style={{ marginLeft: 8 }}
//       >
//         Convert to Excel
//       </button>
//       <button
//         onClick={() => convertPdf("image")}
//         disabled={loading || !file}
//         style={{ marginLeft: 8 }}
//       >
//         Convert to Image
//       </button>
//     </div>
//   );
// }


























