import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";
import { Legend } from "./Legend";

import "../styles/stream.css";
import colors from "../data/colors.json";

import bookParts from "../data/parts";

export const Stream = (props) => {
  const { data, keys, wWidth, wHeight } = props;
  const ref = useRef();

  const margin = useMemo(() => {
    return { top: 20, right: 30, bottom: 0, left: 30 };
  }, []);
  const width = wWidth - 150 - margin.left - margin.right;
  const height = wHeight - 280 - margin.top - margin.bottom;

  useEffect(() => {
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
        d3.extent(data, function (d) {
          return d.total;
        })
      )
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height * 0.9 + ")")
      .call(
        d3
          .axisBottom(x)
          .tickFormat((d) => bookParts[String(d)])
          .tickSize(-height * 0.8)
          .tickValues([1, 69, 168, 264, 338])
      )
      .select(".domain")
      .remove();
    svg.selectAll(".tick line").attr("stroke", "#bdae9f");
    svg
      .selectAll(".tick text")
      .attr("y", -6)
      .attr("x", 4)
      .style("text-anchor", "start");

    // Add Y axis
    const y = d3.scaleLinear().domain([-60, 60]).range([height, 0]);

    // stack
    const stackedData = d3.stack().offset(d3.stackOffsetSilhouette).keys(keys)(
      data
    );

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
      });
    // .curve(d3.curveMonotoneX);

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
      .attr("d", area);
  }, [data, keys, margin, height, width, wWidth]);

  return (
    <div className="page-container fade-in">
      <Legend keys={keys} />
      <svg
        ref={ref}
        width={width}
        height={height}
        style={{ padding: "30px" }}
      />
    </div>
  );
};
