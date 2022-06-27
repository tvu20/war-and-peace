import React, { useState, useEffect } from "react";
import "../styles/progress.css";

// progressbar props should have:
// current: number
// total: number

// filler props:
// percentage: string

const Filler = (props) => {
  const { percent } = props;
  return <div className="filler" style={{ width: `${percent}%` }}></div>;
};

export const ProgressBar = (props) => {
  const { current, total } = props;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    setPercent((current / total) * 100);
  }, [current, total]);

  return (
    <div className="progress-bar">
      <Filler percent={percent} />
    </div>
  );
};
