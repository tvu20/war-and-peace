import React, { useEffect } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import themeData from "../data/theme-details.json";
import generalData from "../data/general-info.json";

import { BarPlot } from "../components/BarPlot";

export const Themes = (props) => {
  const { height, width } = useWindowDimensions();

  const { updateBG } = props;

  useEffect(() => {
    updateBG(false);
  }, [updateBG]);

  return (
    <>
      <BarPlot
        data={themeData}
        keys={generalData.themes}
        wWidth={width}
        wHeight={height}
        sections={generalData.sections}
      />
    </>
  );
};
