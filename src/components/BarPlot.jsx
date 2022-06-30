import React, { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { convertNumber } from "../functions/convert";
import { findMaxY } from "../functions/bounds";

import "../styles/map.css";

export const BarPlot = (props) => {
  const ref = useRef();
  const { data, keys, wHeight, wWidth, sections } = props;
  // Size ?
  const margin = useMemo(() => {
    return { top: 20, right: 30, bottom: 0, left: 30 };
  }, []);
  const width = wWidth - 350 - margin.left - margin.right;
  const height = wHeight - 360 - margin.top - margin.bottom;

  const nextBook = () => {
    if (currentBook === sections) return;
    setCurrentBook(currentBook + 1);
  };

  const lastBook = () => {
    if (currentBook === 1) return;
    setCurrentBook(currentBook - 1);
  };

  const [currentBook, setCurrentBook] = useState(1);
  const [bookData, setBookData] = useState([]);

  // calculating theme data
  useEffect(() => {
    if (!data) return;
    const newData = data.filter((chap) => {
      return convertNumber(chap.book) === currentBook;
    });
    setBookData(newData[0].themes);
  }, [currentBook, data, keys]);

  useEffect(() => {
    if (!keys) return;
    if (bookData.length === 0) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3
      .scaleBand()
      .range([0, width])
      .domain(
        bookData.map(function (d) {
          return d.theme;
        })
      )
      .padding(0.2);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, findMaxY(bookData)])
      .range([height, 0]);
    svg.append("g").attr("class", "myYaxis").call(d3.axisLeft(y));

    // Bars
    svg
      .selectAll("mybar")
      .data(bookData)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.theme);
      })
      .attr("y", function (d) {
        return y(d.amount);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.amount);
      })
      .attr("fill", "#69b3a2");

    // })
  }, [height, width, wWidth, wHeight, keys, bookData, margin]);

  return (
    <div className="page-container fade-in">
      <svg ref={ref} width={width} height={height} />
      <div className="btn-container">
        {currentBook !== 1 && (
          <button onClick={lastBook} className="btn">
            <i className="arrow left"></i>
          </button>
        )}
        {currentBook !== sections && (
          <button onClick={nextBook} className="btn">
            <i className="arrow right"></i>
          </button>
        )}
      </div>
    </div>
  );
};
