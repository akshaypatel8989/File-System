import React, { useState } from "react";
import ConverterGrid from "./ConverterGrid";
import FileUploader from "./FileUploader";

export default function FileConverterApp() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCard, setSelectedCard] = useState(null); // track which card clicked

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "30px auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        File Converter System
      </h2>

      {/* Show upload page if a card is selected */}
      {selectedCard ? (
        <FileUploader card={selectedCard} onBack={handleBack} />
      ) : (
        <>
          {/* Tabs can remain if you want multiple categories */}
          <ConverterGrid activeTab={activeTab} onCardClick={handleCardClick} />
        </>
      )}
    </div>
  );
}





































// import React, { useState } from "react";
// import Word from "./Word";
// import Excel from "./Excel";
// import Pdf from "./Pdf";
// import Image from "./img";
// import "./ConverterUI.css"; // External CSS

// export default function FileConverterApp() {
//   const [activeTool, setActiveTool] = useState(null);

//   const tools = [
//     {id: "image", label:"Image Tools",icon: "📊"},
//     { id: "word", label: "Word Tools", icon: "📄" },
//     { id: "excel", label: "Excel Tools", icon: "📊" },
//     { id: "pdf", label: "PDF Tools", icon: "📑" }
    
//     // Add more tools here if needed
//   ];

//   const renderTool = () => {
//     switch (activeTool) {
//       case "word":
//         return <Word />;
//       case "excel":
//         return <Excel />;
//       case "pdf":
//         return <Pdf />;
//       case "image":
//         return <Image/> 
        
//       default:
//         return <p>Please select a tool by clicking a card above.</p>;
//     }
//   };

//   return (
//     <div className="file-converter-container">
//       <h2>File Converter System</h2>

//       {/* Cards */}
//       <div className="cards-container">
//         {tools.map((tool) => (
//           <div
//             key={tool.id}
//             className={`converter-card ${activeTool === tool.id ? "active" : ""}`}
//             onClick={() => setActiveTool(tool.id)}
//           >
//             <div className="card-icon">{tool.icon}</div>
//             <div className="card-label">{tool.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Tool Section */}
//       <div className="tool-section">{renderTool()}</div>
//     </div>
//   );
// }

