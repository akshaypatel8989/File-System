import React from "react";
import "./Card.css";
import icon from "./dd8d3904-8bfb-47a8-936a-a02b549cf137.png"; // your uploaded icon

export default function Card({ title, description, iconImage }) {
  return (
    <div className="card-container">
      <img src={iconImage || icon} alt="icon" className="card-icon" />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  );
}
