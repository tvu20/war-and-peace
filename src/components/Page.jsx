import React from "react";
import { TitlePage } from "../pages/TitlePage";

export const Page = (props) => {
  const { page } = props;

  const showPage = () => {
    switch (page) {
      case 0:
        return <TitlePage />;
      default:
        return <div>Doesn't exist yet sorry</div>;
    }
  };

  return <>{showPage()}</>;
};
