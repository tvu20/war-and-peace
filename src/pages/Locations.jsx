import React from "react";
import { Map } from "../components/Map";
import useWindowDimensions from "../hooks/useWindowDimensions";

export const Locations = (props) => {
  const { height, width } = useWindowDimensions();
  return (
    <div>
      <Map wHeight={height} wWidth={width} />
    </div>
  );
};
