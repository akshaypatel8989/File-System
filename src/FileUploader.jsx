// import React, { useState } from "react";

// export default function FileUploader({ card, onBack }) {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!file) {
//       alert("Please select a file first!");
//       return;
//     }
//     alert(`${file.name} selected for ${card.title} conversion`);
//     // You can add actual conversion logic or API call here.
//   };

//   return (
//     <div className="uploader-container">
//       <button className="back-btn" onClick={onBack}>
//         ← Back
//       </button>

//       <h3>{card.title}</h3>
//       <p>{card.desc}</p>

//       <div className="upload-box">
//         <input type="file" onChange={handleFileChange} />
//         {file && <p>Selected: {file.name}</p>}
//         <button className="convert-btn" onClick={handleUpload}>
//           Convert Now
//         </button>
//       </div>
//     </div>
//   );
// }


import React, { useRef, useState } from "react";

export default function FileUploader({ card, onBack }) {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); // for hidden file input

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // open file picker
  };

  const handleUpload = () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    alert(`${file.name} selected for ${card.title} conversion`);
  };

  return (
    <div className="uploader-container">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <h3>{card.title}</h3>
      <p>{card.desc}</p>

      <div className="upload-box">
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Simple button to trigger file selection */}
        <button className="select-file-btn" onClick={handleButtonClick}>
          {file ? "Change File" : "Select File"}
        </button>

        {file && <p style={{ marginTop: "10px" }}>📄 {file.name}</p>}

        <button className="convert-btn" onClick={handleUpload}>
          Convert Now
        </button>
      </div>
    </div>
  );
}

