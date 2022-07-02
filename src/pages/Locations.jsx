import React, { useEffect } from "react";
import { Map } from "../components/Map";
import useWindowDimensions from "../hooks/useWindowDimensions";

export const Locations = (props) => {
  const { height, width } = useWindowDimensions();

  const { updateBG } = props;
  useEffect(() => {
    updateBG(false);
  }, [updateBG]);
  return (
    <div>
      <Map wHeight={height} wWidth={width} />
    </div>
  );
};
