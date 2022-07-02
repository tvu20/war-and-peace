import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import generalData from "../data/general-info";
import characterData from "../data/chapter-detail";

import { Stream } from "../components/Stream";

export const AllCharacters = (props) => {
  const [keys, setKeys] = useState();
  const [newData, setNewData] = useState();

  const { height, width } = useWindowDimensions();

  const { updateBG } = props;
  useEffect(() => {
    updateBG(false);
  }, [updateBG]);

  useEffect(() => {
    setKeys(Object.keys(generalData.characters));

    const temp = [];
    characterData.forEach((elem) => {
      var nData = { ...elem };
      for (const char in elem.characters) {
        nData[char] = elem.characters[char];
      }
      temp.push(nData);
    });
    setNewData(temp);
  }, []);

  return (
    <>
      <Stream data={newData} keys={keys} wWidth={width} wHeight={height} />
    </>
  );
};
