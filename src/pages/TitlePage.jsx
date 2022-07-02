import React, { useEffect } from "react";

import "../styles/text.css";

export const TitlePage = (props) => {
  const { updateBG } = props;

  useEffect(() => {
    updateBG(false);
  }, [updateBG]);
  return (
    <div className="page-container fade-in">
      {/* <ScrollingBackground /> */}
      <div className="title-container">
        <h1>War and Peace</h1>
        <h2>Original Novel by Leo Tolstoy</h2>
        <p>
          A brief textual analysis of one of the most highly praised pieces of
          world classical literature, presented as an interactive data
          visualization essay.
        </p>
        <h4>Created by Giao Vu Dinh | Originally published in July 2022</h4>
      </div>
    </div>
  );
};
