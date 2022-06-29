import React from "react";
import { TitlePage } from "../pages/TitlePage";
import { AllCharacters } from "../pages/AllCharacters";
import { AllCharactersBook } from "../pages/AllCharactersBook";

export const Page = (props) => {
  const { page } = props;

  const showPage = () => {
    switch (page) {
      // case 0:
      //   return <TitlePage />;
      case 1:
        return <AllCharacters />;
      case 0:
        return <AllCharactersBook />;
      default:
        return <div>Doesn't exist yet sorry</div>;
    }
  };

  return <>{showPage()}</>;
};
