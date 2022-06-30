import React from "react";
import { TitlePage } from "../pages/TitlePage";
import { AllCharacters } from "../pages/AllCharacters";
import { AllCharactersBook } from "../pages/AllCharactersBook";
import { Locations } from "../pages/Locations";

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
      case 0:
        return <Locations />;
      default:
        return <div>Doesn't exist yet sorry</div>;
    }
  };

  return <>{showPage()}</>;
};
