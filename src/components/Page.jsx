import React, { useState } from "react";

import { ScrollingBackground } from "./ScrollingBackground";

import { TitlePage } from "../pages/TitlePage";
import { Navigation } from "../pages/Navigation";
import { IntroPage } from "../pages/IntroPage";
import { IntroPageTwo } from "../pages/IntroPageTwo";
import { CharacterIntro } from "../pages/CharacterIntro";
import { AllCharacters } from "../pages/AllCharacters";
import { AllCharactersBook } from "../pages/AllCharactersBook";
import { CharacterHeat } from "../pages/CharacterHeat";
import { Locations } from "../pages/Locations";
import { Themes } from "../pages/Themes";
import { LocationsIntro } from "../pages/LocationsIntro";
import { ThemeIntro } from "../pages/ThemeIntro";
import { Outro } from "../pages/Outro";
import { Credits } from "../pages/Credits";

export const Page = (props) => {
  const { page } = props;

  const [showBG, setShowBG] = useState(false);

  const updateBG = (value) => {
    if (value !== showBG) setShowBG(value);
  };

  const showPage = () => {
    switch (page) {
      case 0:
        return <TitlePage updateBG={updateBG} />;
      case 1:
        return <Navigation updateBG={updateBG} />;
      case 2:
        return <IntroPage updateBG={updateBG} />;
      case 3:
        return <IntroPageTwo updateBG={updateBG} />;
      case 4:
        return <CharacterIntro updateBG={updateBG} />;
      case 5:
        return <CharacterHeat updateBG={updateBG} />;
      case 6:
        return <AllCharactersBook />;
      case 7:
        return <AllCharacters updateBG={updateBG} />;
      case 8:
        return <LocationsIntro updateBG={updateBG} />;
      case 9:
        return <Locations updateBG={updateBG} />;
      case 10:
        return <ThemeIntro updateBG={updateBG} />;
      case 11:
        return <Themes updateBG={updateBG} />;
      case 12:
        return <Outro />;
      case 13:
        return <Credits />;
      default:
        return <div>Doesn't exist yet sorry</div>;
    }
  };

  return (
    <>
      {showBG && <ScrollingBackground />}
      {showPage()}
    </>
  );
};
