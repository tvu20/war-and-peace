import React from "react";

import "../styles/text.css";

export const MobileBanner = (props) => {
  return (
    <div className="page-container mobile-only banner">
      <div className="text-container">
        <h2>This content is best viewed on a desktop screen.</h2>
        <p>
          See the full source code on{" "}
          <a href="https://github.com/tvu20/war-and-peace">Github.</a>
        </p>
      </div>
    </div>
  );
};
