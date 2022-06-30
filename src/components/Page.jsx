import React from "react";
import { TitlePage } from "../pages/TitlePage";
import { AllCharacters } from "../pages/AllCharacters";
import { AllCharactersBook } from "../pages/AllCharactersBook";
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
      // case 0:
      //   return <AllCharactersBook />;
      // case 0:
      //   return <Locations />;
      case 0:
        return <Themes />;
      default:
        return <div>Doesn't exist yet sorry</div>;
    }
  };

  return <>{showPage()}</>;
};
