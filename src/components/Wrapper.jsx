import React from "react";
import { useState, useEffect, useCallback } from "react";
import { ProgressBar } from "./ProgressBar";
import { Page } from "./Page";

import generalData from "../data/general-info";

export const Wrapper = () => {
  const [page, setPage] = useState(0);
  const max = 15;

  const nextPage = () => {
    setPage((curr) => {
      let temp = curr + 1;
      return temp < max ? temp : max;
    });
  };
  const prevPage = () => {
    setPage((curr) => {
      let temp = curr - 1;
      return temp > 0 ? temp : 0;
    });
  };

  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 37) {
      prevPage();
    }

    if (event.keyCode === 39) {
      nextPage();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <ProgressBar current={page} total={max} />
      <Page page={page} />
    </>
  );
};
