import React, { useState } from "react";
import Img from "./img";
import Word from "./Word";
import Excel from "./Excel";
import Pdf from "./Pdf";
export default function FileConverterApp() {
  const [activeTab, setActiveTab] = useState("image");

  const tabs = [
    { id: "Img", label: "Image Tools" },
    { id: "word", label: "Word Tools" },
    { id: "excel", label: "Excel Tools" },
    { id: "pdf", label: "PDF Tools" },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        File Converter System
      </h2>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 20px",
              margin: "0 5px",
              border: "none",
              borderBottom: activeTab === tab.id ? "3px solid red" : "3px solid transparent",
              background: "none",
              cursor: "pointer",
              fontWeight: activeTab === tab.id ? "bold" : "normal",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tool Sections */}
      <div>
        {activeTab === "Img" && <Img />}
        {activeTab === "word" && <Word />}
        {activeTab === "excel" && <Excel />}
        {activeTab === "pdf" && <Pdf />}
      </div>
    </div>
  );
}































// import React, { useState } from "react";
// import Img from "./img";
// import Word from "./Word";
// import Excel from "./Excel";
// import Pdf from "./Pdf";

// export default function FileConverterApp() {
//   const [activeTab, setActiveTab] = useState("image");

//   const tabs = [
//      { id: "image", label: "image Tools" },
//     { id: "word", label: "Word Tools" },
 
//      { id: "Pdf", label: "Pdf Tools" },
//         { id: "Excel", label: "Excel Tools" },
//   ];

//   return (
//     <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px" }}>
//       <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
//         File Converter System
//       </h1>

//       {/* Tabs */}
//       <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
//         {tabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             style={{
//               padding: "10px 20px",
//               margin: "0 5px",
//               border: "none",
//               borderBottom: activeTab === tab.id ? "3px solid red" : "3px solid transparent",
//               background: "none",
//               cursor: "pointer",
//               fontWeight: activeTab === tab.id ? "bold" : "normal",
//             }}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Tool Sections */}
//       <div>
//         {activeTab === "Image" && <Img />}
//         {activeTab === "word" && <Word />}
       
//           {activeTab === "Pdf" && <Pdf />}
//                 {activeTab === "Excel" && <Excel />}
//       </div>
//     </div>
//   );
// }
















// import React from "react";
// import { FileImage, FileText, FileSpreadsheet } from "lucide-react"; // icons

// export default function Form({ onSelectTool }) {
//   const tools = [
//     {
//       title: "Image to PDF",
//       desc: "Convert JPG, PNG to PDF instantly.",
//       color: "bg-red-500 hover:bg-red-600",
//       icon: <FileImage className="w-10 h-10" />,
//       type: "image",
//       endpoint: "image-to-pdf",
//     },
//     {
//       title: "Word to PDF",
//       desc: "Convert Word documents to PDF.",
//       color: "bg-red-500 hover:bg-red-600",
//       icon: <FileText className="w-10 h-10" />,
//       type: "word",
//       endpoint: "to-pdf",
//     },
//     {
//       title: "Excel to PDF",
//       desc: "Convert Excel spreadsheets to PDF.",
//       color: "bg-red-500 hover:bg-red-600",
//       icon: <FileSpreadsheet className="w-10 h-10" />,
//       type: "excel",
//       endpoint: "to-pdf",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">
//       <div className="max-w-5xl w-full">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
//           All Tools
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {tools.map((tool, idx) => (
//             <div
//               key={idx}
//               className={`${tool.color} text-white p-8 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition`}
//               onClick={() =>
//                 onSelectTool({ type: tool.type, endpoint: tool.endpoint })
//               }
//             >
//               <div className="flex flex-col items-center">
//                 {tool.icon}
//                 <h2 className="text-xl font-semibold mt-4">{tool.title}</h2>
//                 <p className="text-sm text-gray-100 mt-2">{tool.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }






// import React, { useState } from "react";

// export default function FileConverter() {
//   const [file, setFile] = useState(null);
//   const [type, setType] = useState("image"); // image | word | excel
//   const [endpoint, setEndpoint] = useState("to-pdf"); // default
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setLoading(true);

//       const response = await fetch(
//         `http://localhost:5000/api/${type}s/${endpoint}`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Conversion failed");
//       }

//       // download converted file
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `converted-${Date.now()}.pdf`; // default name
//       a.click();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error(err);
//       alert("Error converting file!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
//       <h2>File Converter</h2>

//       <form onSubmit={handleSubmit}>
//         {/* Select file type */}
//         <label>
//           File Type:{" "}
//           <select value={type} onChange={(e) => setType(e.target.value)}>
//             <option value="image">Image</option>
//             <option value="word">Word</option>
//             <option value="excel">Excel</option>
//           </select>
//         </label>
//         <br />

//         {/* Select conversion */}
//         <label>
//           Conversion:{" "}
//           <select value={endpoint} onChange={(e) => setEndpoint(e.target.value)}>
//             {/* Image options */}
//             {type === "image" && (
//               <>
//                 <option value="image-to-pdf">Image → PDF</option>
//                 <option value="pdf-to-png">PDF → PNG</option>
//               </>
//             )}
//             {/* Word options */}
//             {type === "word" && (
//               <>
//                 <option value="to-pdf">Word → PDF</option>
//                 <option value="to-text">Word → Text</option>
//               </>
//             )}
//             {/* Excel options */}
//             {type === "excel" && (
//               <>
//                 <option value="to-csv">Excel → CSV</option>
//                 <option value="to-pdf">Excel → PDF</option>
//               </>
//             )}
//           </select>
//         </label>
//         <br />

//         {/* File input */}
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           accept={
//             type === "image"
//               ? "image/*"
//               : type === "word"
//               ? ".doc,.docx"
//               : ".xls,.xlsx"
//           }
//         />
//         <br />

//         <button type="submit" disabled={loading}>
//           {loading ? "Converting..." : "Convert"}
//         </button>
//       </form>
//     </div>
//   );
// }























// import React, { useState } from "react";

// export default function Converter() {
//   const [file, setFile] = useState(null);
//   const [format, setFormat] = useState("png");
//   const [conversionType, setConversionType] = useState("image");
//   const [downloadUrl, setDownloadUrl] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return alert("Please upload a file");

//     const formData = new FormData();
//     formData.append("file", file);
//     if (conversionType === "image") {
//       formData.append("format", format);
//     }

//     let endpoint = "";
//     if (conversionType === "image") endpoint = "/api/image";
//     if (conversionType === "image-to-pdf") endpoint = "/api/image-to-pdf";
//     if (conversionType === "pdf-to-png") endpoint = "/api/pdf-to-png";

//     try {
//       const response = await fetch(`http://localhost:5000${endpoint}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Conversion failed");

//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       setDownloadUrl(url);
//     } catch (err) {
//       alert("Error: " + err.message);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
//       <h2> File Converter</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           required
//         />
//         <br /> <br />

//         <label>Choose Conversion Type:</label>
//         <select
//           value={conversionType}
//           onChange={(e) => setConversionType(e.target.value)}
//         >
//           <option value="image">Image ↔ PNG/JPG</option>
//           <option value="image-to-pdf">Image → PDF</option>
//           <option value="pdf-to-png">PDF → PNG</option>
//         </select>
//         <br /> <br />

//         {conversionType === "image" && (
//           <>
//             <label>Convert To:</label>
//             <select value={format} onChange={(e) => setFormat(e.target.value)}>
//               <option value="png">PNG</option>
//               <option value="jpg">JPG</option>
//             </select>
//             <br /> <br />
//           </>
//         )}

//         <button type="submit">Convert</button>
//       </form>

//       {downloadUrl && (
//         <div style={{ marginTop: "20px" }}>
//           <a href={downloadUrl} download="converted-file">
//             ⬇️ Download Converted File
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }
