import React, { useEffect } from "react";

import "../styles/text.css";

export const LocationsIntro = (props) => {
  const { updateBG } = props;

  useEffect(() => {
    updateBG(true);
  }, [updateBG]);

  return (
    <div className="page-container fade-in">
      <div className="text-container">
        <h2>Locations</h2>
        <p>
          Petersburg and Moscow, the two major cities of Russia, are home to
          many of the aristocratic families and are the sites of major political
          and interpersonal drama, while the men of the novel find themselves
          involved in battles across multiple nations. In a countryside estate
          west of Moscow, Old Prince Bolkonsky and Princess Marya remain
          isolated from the rest of civilization.
        </p>
      </div>
    </div>
  );
};
