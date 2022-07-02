import React, { useEffect } from "react";

import "../styles/text.css";

export const IntroPageTwo = (props) => {
  const { updateBG } = props;

  useEffect(() => {
    updateBG(true);
  }, [updateBG]);
  return (
    <div className="page-container fade-in">
      <div className="text-container">
        <p>
          So how do we quantify such a massive body of text? This project aims
          to take a closer look at how Tolstoy has structured his novel by
          breaking it down into its parts and identifying the key words present
          in the novel.
        </p>
      </div>
    </div>
  );
};
