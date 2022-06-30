import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import themeData from "../data/theme-details.json";
import generalData from "../data/general-info.json";

import { BarPlot } from "../components/BarPlot";

export const Themes = () => {
  const { height, width } = useWindowDimensions();

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
