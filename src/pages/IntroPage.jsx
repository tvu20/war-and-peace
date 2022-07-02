import React, { useEffect } from "react";

import "../styles/text.css";

export const IntroPage = (props) => {
  const { updateBG } = props;

  useEffect(() => {
    updateBG(true);
  }, [updateBG]);
  return (
    <div className="page-container fade-in">
      <div className="text-container">
        <p>
          <i>War and Peace</i>, written by the Russian author Leo Tolstoy in
          1869, spans over 1200 pages, 361 chapters, and 580,000 words in its
          original edition. The literary work, which interweaves the drama and
          intrigue of various aristocratic Russian families with philosophical
          commentary on the French invasion of Russia in the early 1800s,
          encapsulates over two decades, 500 characters, and countless themes
          and motifs for readers to digest over the course of reading the novel.
        </p>
      </div>
    </div>
  );
};
