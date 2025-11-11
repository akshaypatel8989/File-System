import React from "react";

export default function ConverterCard({ card, onClick }) {
  return (
    <div className="converter-card" onClick={onClick}>
      <div className="icon" style={{ backgroundColor: card.color }}>
        <span>{card.icon}</span>
      </div>
      <h3>{card.title}</h3>
      <p>{card.desc}</p>
      {card.isNew && <span className="new-badge">New!</span>}
    </div>
  );
}

