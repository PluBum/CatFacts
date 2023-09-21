// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

import "../style/style.css";
import { useState } from "react";
// import { useEffect, useState } from "react";
// import { getData, getFactsData, getImageData } from "./CatsRequest";

export interface CatsCardProps {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
  imageUrl?: string;
  facts?: string;
}
export const CatsCardComponent = (props: CatsCardProps) => {
  const [showText, setShowText] = useState(false);

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <div className="container">
      {props.imageUrl && (
        <img
          src={props.imageUrl}
          className="image_cats"
          style={{
            display: "inline-block",
            width: "100%",
            height: "400px",
          }}
        ></img>
      )}
      <p className="card_item">Breed: {props.breed}</p>
      <p className="card_item">Country: {props.country}</p>
      <p className="card_item">Coat: {props.coat}</p>
      <p className="card_item">Origin: {props.origin}</p>
      <p className="card_item">Pattern: {props.pattern}</p>
      <button onClick={toggleText} className="textButton">
        {showText ? "Hide a fact about a cat" : "Show a fact about a cat"}
      </button>
      {showText && props.facts && (
        <div className="cardItem">
          <p className="cardItemText">{props.facts}</p>
        </div>
      )}
    </div>
  );
};
export default CatsCardComponent;
