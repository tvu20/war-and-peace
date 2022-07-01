import React, { useState, useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

import { BookInfo } from "./BookInfo";

import { convertNumber } from "../functions/convert";
import { findMaxY } from "../functions/bounds";
import { capitalizeFirstLetter } from "../functions/strings";

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

  const [firstItem, setFirstItem] = useState(true);
  const [currentBook, setCurrentBook] = useState(1);
  const [bookName, setBookName] = useState("");
  const [bookData, setBookData] = useState([]);

  const [prevData, setPrevData] = useState([]);

  const nextBook = () => {
    if (currentBook === sections) return;
    setCurrentBook(currentBook + 1);
  };

  const lastBook = () => {
    if (currentBook === 1) return;
    setCurrentBook(currentBook - 1);
  };

  // calculating theme data
  useEffect(() => {
    if (!data) return;
    const newData = data.filter((chap) => {
      return convertNumber(chap.book) === currentBook;
    });

    if (bookData.length === 0) {
      setPrevData(newData[0].themes);
    } else {
      if (firstItem) setFirstItem(false);
      setPrevData(bookData);
    }
    setBookName(newData[0].book);
    setBookData(newData[0].themes);
  }, [currentBook, data, keys, bookData, firstItem]);

  useEffect(() => {
    if (!keys) return;
    if (bookData.length === 0) return;

    if (prevData === bookData && !firstItem) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg
      .append("svg")
      .attr("width", width)
      .attr("height", height + 40)
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
      .attr("transform", "translate(0," + (height + 10) + ")")
      .call(
        d3
          .axisBottom(x)
          .tickSize(0)
          .tickFormat((d) => capitalizeFirstLetter(d))
      )
      .select(".domain")
      .remove();

    // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, findMaxY(prevData)])
      .range([height, 0]);
    svg.append("g").attr("class", "myYaxis").call(d3.axisLeft(y));

    svg
      .selectAll("mybar")
      .data(prevData)
      // .data(bookData)
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

    const u = svg.selectAll("rect").data(bookData);

    // Add Y axis
    y = d3
      .scaleLinear()
      .domain([0, findMaxY(bookData)])
      .range([height, 0]);

    u.transition()
      .duration(1000)
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
  }, [
    height,
    width,
    wWidth,
    wHeight,
    keys,
    bookData,
    margin,
    prevData,
    firstItem,
  ]);

  return (
    <div className="page-container fade-in">
      <div style={{ height: "60px", visibility: "hidden" }}>spacer</div>
      <svg ref={ref} width={width} height={height + 40} />
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
      <BookInfo bookName={bookName} />
    </div>
  );
};
