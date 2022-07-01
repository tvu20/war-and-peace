import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import generalData from "../data/general-info";
import characterData from "../data/chapter-detail";

import { Heatmap } from "../components/Heatmap";

export const CharacterHeat = () => {
  const [keys, setKeys] = useState();
  const [newData, setNewData] = useState();

  const { width } = useWindowDimensions();

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
      <Heatmap data={newData} keys={keys} wWidth={width} />
    </>
  );
};
