import React from "react";
import { TitlePage } from "../pages/TitlePage";
import { AllCharacters } from "../pages/AllCharacters";

export const Page = (props) => {
  const { page } = props;

  const showPage = () => {
    switch (page) {
      case 0:
        return <TitlePage />;
      case 1:
        return <AllCharacters />;
      default:
        return <div>Doesn't exist yet sorry</div>;
    }
  };

  return <>{showPage()}</>;
};
