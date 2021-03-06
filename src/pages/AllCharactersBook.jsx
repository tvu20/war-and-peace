import React, { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";

import generalData from "../data/general-info";
import characterData from "../data/chapter-detail";

import { StreamBook } from "../components/StreamBook";

export const AllCharactersBook = () => {
  const [keys, setKeys] = useState();
  const [newData, setNewData] = useState();

  const { height, width } = useWindowDimensions();

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
      <StreamBook
        data={newData}
        keys={keys}
        wWidth={width}
        wHeight={height}
        sections={generalData.sections}
      />
    </>
  );
};
