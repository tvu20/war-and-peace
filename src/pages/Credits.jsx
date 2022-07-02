import React from "react";

import "../styles/text.css";

export const Credits = () => {
  return (
    <div className="page-container fade-in">
      <div className="text-container">
        <h3>Ending Notes</h3>
        <p>
          Data was scraped and formatted from the Project Gutenburg version of{" "}
          <a href="https://www.gutenberg.org/files/2600/2600-h/2600-h.htm">
            <i>War and Peace</i>
          </a>{" "}
          using Python and BeautifulSoup. All book, character, and location
          descriptions were provided by myself. Charts and interactive diagrams
          were created using the D3.js framework on a React application.
        </p>
        <p>
          This project was heavily inspired by{" "}
          <a href="https://pudding.cool/">
            <i>The Pudding's</i>
          </a>{" "}
          data visualization essay projects and was created for Red Hat HACk
          week in June/July 2022.{" "}
        </p>
        <p>
          A special thanks to my instructors and classmates in Princeton
          University SLA 415:{" "}
          <i>Leo Tolstoy, War and Peace: Writing and Fighting</i> for
          inspiration.
        </p>
        <p>
          This project is open-source and all code and data can be found on{" "}
          <a href="https://github.com/tvu20/war-and-peace">Github.</a>
        </p>
      </div>
    </div>
  );
};
