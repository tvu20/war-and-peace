import React, { useEffect, useRef, useMemo } from "react";
import * as d3 from "d3";

import "../styles/map.css";

export const Heatmap = (props) => {
  const { data, keys, wWidth } = props;
  const ref = useRef();

  const margin = useMemo(() => {
    return { top: 20, right: 30, bottom: 0, left: 30 };
  }, []);
  const width = Math.min(800, wWidth - 160 - margin.left - margin.right);
  const height = 400;

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
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")
      .remove();

    // shuffling and choosing 4
    const shuffled = keys.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 4).sort((a, b) => a.localeCompare(b));

    selected.forEach((name, i) => {
      var myColor = d3
        .scaleLinear()
        .range(["#fffcf7", "#69b3a2"])
        .domain([1, 60]);

      svg
        .selectAll()
        .data(data, function (d) {
          return d.total + ":" + d[name];
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.total);
        })
        .attr("y", i * 90 + 30)
        .attr("width", 2)
        .attr("height", 40)
        .style("fill", function (d) {
          return myColor(d[name]);
        });

      svg
        .append("text")
        .text(name)
        .attr("class", "helper-text")
        .attr("y", 20 + i * 90);

      d3.selectAll(".helper-text").attr("fill", "#524232");
    });
  }, [data, keys, margin, height, width, wWidth]);

  return (
    <div className="page-container fade-in">
      <svg
        ref={ref}
        width={width}
        height={height}
        style={{ padding: "30px" }}
      />
      <div className="map-description__heat">
        Here are heatmaps of some random characters and their appearances
        throughout the novel, where the darker the line, the most they are
        mentioned in a particular chapter. By comparing them row by row, you can
        see which characters have significantly more prominent roles — and at
        which parts of the novel are their key moments.
      </div>
    </div>
  );
};
