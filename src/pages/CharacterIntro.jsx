import React, { useEffect } from "react";

import "../styles/text.css";

export const CharacterIntro = (props) => {
  const { updateBG } = props;

  useEffect(() => {
    updateBG(false);
  }, [updateBG]);

  return (
    <div className="page-container fade-in">
      <div className="text-container">
        <h2>Character Analysis</h2>
        <p>
          Characters are the heart and soul of the narrative in{" "}
          <i>War and Peace</i>. The novel follows the lives of Russian
          aristocrats from four families: Pierre Bezukhov, the central
          protagonist; the Bezkhovs, a lively and music-loving family plagued by
          financial woes; the Bolkonskys, an old and noble family from the Bald
          Hills estate; and the Kuragins, who desire to intermix into high-end
          society.
        </p>
        <p>
          The storylines of the main characters of the novel are interwoven of
          the course of five books and an epilogue. As characters meet and form
          relationships throughout the story, the livelihoods of these families
          gradually become more intertwined.
        </p>
      </div>
    </div>
  );
};
