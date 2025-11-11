import React from "react";
import ConverterCard from "./ConverterCard";

export default function ConverterGrid({ activeTab, onCardClick }) {
  const cardData = [
    {
      id: "word",
      title: "Word to PDF",
      desc: "Convert DOC and DOCX files to PDF format easily.",
      color: "#2B579A",
      icon: "W",
    },
    {
      id: "excel",
      title: "Excel to PDF",
      desc: "Convert Excel files into PDF documents for easy sharing.",
      color: "#217346",
      icon: "X",
    },
    {
      id: "powerpoint",
      title: "PowerPoint to PDF",
      desc: "Convert PPT slideshows into PDF files for easy viewing.",
      color: "#D24726",
      icon: "P",
    },
    {
      id: "edit",
      title: "Edit PDF",
      desc: "Add text, shapes, or images into PDF documents.",
      color: "#A23C92",
      icon: "✎",
      isNew: true,
    },
  ];

  return (
    <div className="file-converter-container">
      {cardData.map((card) => (
        <ConverterCard key={card.id} card={card} onClick={() => onCardClick(card)} />
      ))}
    </div>
  );
}
