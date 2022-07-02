import React, { useEffect } from "react";

import "../styles/text.css";

export const ThemeIntro = (props) => {
  const { updateBG } = props;

  useEffect(() => {
    updateBG(true);
  }, [updateBG]);

  return (
    <div className="page-container fade-in">
      <div className="text-container">
        <h2>Themes</h2>
        <p>
          Although a large portion of <i>War and Peace</i> focuses on the
          individual maneuvers of our protagonists against the backdrop of war,
          Tolstoy constantly emphasizes the irrational motives and ultimate
          insignificance of human behavior in both war and peace. The novel
          explores the emergence of various themes such as the irrationality and
          impulse of human motive, the search for love and life contrasted with
          artificial beauty and pleasure, and the inevitible toll of death.
        </p>
        <p>
          The next slide provides a look at how the themes emerge and vary
          throughout the course of the novel, with various themes appearing to
          mirror or counter each other's appearances.
        </p>
      </div>
    </div>
  );
};
