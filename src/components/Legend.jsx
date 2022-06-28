import React from "react";

import colors from "../data/colors";

export const Legend = (props) => {
  const { keys } = props;

  const showLegend = () => {
    return keys?.map((item, key) => {
      return (
        <div
          className="flex-legend-item"
          key={key}
          style={{ color: colors[item] }}
        >
          <div className="flex-legend-item-square"></div>
          {item}
        </div>
      );
    });
  };

  return <div className="flex-legend">{showLegend()}</div>;
};
