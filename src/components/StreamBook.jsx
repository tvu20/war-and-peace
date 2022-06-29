import React, { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { Legend } from "./Legend";

import "../styles/stream.css";
import colors from "../data/colors.json";
import { convertNumber } from "../functions/convert";
import { findBounds } from "../functions/bounds";
import { capitalizeFirstLetter } from "../functions/strings";

import characters from "../data/characters";

export const StreamBook = (props) => {
  const { data, keys, wWidth, wHeight, sections } = props;
  const ref = useRef();

  const [currentBook, setCurrentBook] = useState(1);
  const [bookData, setBookData] = useState([]);

  const nextBook = () => {
    if (currentBook === sections) return;
    setCurrentBook(currentBook + 1);
  };

  const prevBook = () => {
    if (currentBook === 1) return;
    setCurrentBook(currentBook - 1);
  };

  const bookName = () => {
    if (bookData.length === 0) return;
    return "Book " + capitalizeFirstLetter(bookData[0].book);
  };

  useEffect(() => {
    if (!data) return;
    const newData = data.filter((chap) => {
      return convertNumber(chap.book) === currentBook;
    });
    setBookData(newData);
  }, [currentBook, data]);

  const margin = useMemo(() => {
    return { top: 20, right: 30, bottom: 0, left: 30 };
  }, []);
  const width = wWidth - 150 - margin.left - margin.right;
  const height = wHeight - 360 - margin.top - margin.bottom;

  useEffect(() => {
    let time = 0;
    if (!keys) return;

    // select root element to append things to
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    const x = d3
      .scaleLinear()
      .domain(
        d3.extent(bookData, function (d) {
          return d.total;
          //   return convertNumber(d.book);
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height * 0.9 + ")")
      .select(".domain")
      .remove();

    // stack
    const stackedData = d3.stack().offset(d3.stackOffsetSilhouette).keys(keys)(
      bookData
    );
    findBounds(stackedData);
    const boundaries = findBounds(stackedData);

    // Add Y axis
    const y = d3.scaleLinear().domain(boundaries).range([height, 0]);

    // create a tooltip
    var Tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("visibility", "hidden");

    // Three function that change the tooltip when user hover / move / leave a cell
    const mouseover = function (d) {
      time++;
      if (time < 1) {
        return;
      } else {
        time = 0;
      }
      Tooltip.style("visibility", "visible");
      d3.selectAll(".myArea").style("opacity", 0.2);
      d3.select(this)
        .style("opacity", 1)
        .style("stroke", (d) => colors[d.key]);
    };
    const mousemove = function (event, i) {
      const current = characters.filter((e) => e.name === i.key)[0];

      const leftValue =
        event.clientX + 250 > wWidth ? event.clientX - 180 : event.clientX;

      Tooltip.html(
        "<h2>" + current.title + "</h2><p>" + current.description + "</p>"
      )
        .style("left", leftValue + 10 + "px")
        .style("top", event.clientY + "px");
    };
    const mouseleave = function (d) {
      Tooltip.style("visibility", "hidden");
      d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none");
    };

    // Area generator
    var area = d3
      .area()
      .x(function (d) {
        return x(d.data.total);
      })
      .y0(function (d) {
        return y(d[0]);
      })
      .y1(function (d) {
        return y(d[1]);
      })
      .curve(d3.curveMonotoneX);

    // Show the areas
    svg
      .selectAll("mylayers")
      .data(stackedData)
      .enter()
      .append("path")
      .attr("class", "myArea")
      .style("fill", function (d) {
        return colors[d.key];
      })
      .style("fill-opacity", 0.6)
      .attr("d", area)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  }, [bookData, data, keys, margin, height, width, wWidth]);

  return (
    <div className="page-container fade-in">
      <Legend keys={keys} />
      <svg
        ref={ref}
        width={width - 300}
        height={height}
        style={{ padding: "30px" }}
      />
      <div className="btn-container">
        {currentBook !== 1 && (
          <button onClick={prevBook} className="btn">
            <i className="arrow left"></i>
          </button>
        )}
        {currentBook !== sections && (
          <button onClick={nextBook} className="btn">
            <i className="arrow right"></i>
          </button>
        )}
      </div>
      <p>{bookName()}</p>
    </div>
  );
};
