import React from "react";
import { TitlePage } from "../pages/TitlePage";
import { AllCharacters } from "../pages/AllCharacters";
import { AllCharactersBook } from "../pages/AllCharactersBook";
import { CharacterHeat } from "../pages/CharacterHeat";
import { Locations } from "../pages/Locations";
import { Themes } from "../pages/Themes";

export const Page = (props) => {
  const { page } = props;

  const showPage = () => {
    switch (page) {
      // case 0:
      //   return <TitlePage />;
      // case 1:
      //   return <AllCharacters />;
      // case 1:
      //   return <AllCharactersBook />;
      // case 1:
      //   return <Locations />;
      case 0:
        return <CharacterHeat />;
      // return <Themes />;
      default:
        return <div>Doesn't exist yet sorry</div>;
    }
  };

  return <>{showPage()}</>;
};
