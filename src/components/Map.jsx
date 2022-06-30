import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";

import "../styles/map.css";
import colors from "../data/colors";
import markers from "../data/locations";

export const Map = (props) => {
  const ref = useRef();
  const { wHeight, wWidth } = props;
  const [location, setLocation] = useState("");

  // Size ?
  const width = wWidth;
  const height = wHeight;
  const scale = 1200;

  useEffect(() => {
    const centerLocation = [30, 53];
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    svg.append("svg").attr("width", width).attr("height", height);

    // Map and projection
    var projection = d3
      .geoMercator()
      .center(centerLocation) // GPS of location to zoom on
      .scale(scale) // This is like the zoom
      .translate([width / 2, height / 2]);

    // Load external data and boot
    d3.json(
      "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson"
    ).then((data) => {
      // Add a scale for bubble size
      var size = d3
        // .scaleLinear()
        .scaleSqrt()
        .domain([1, 100]) // What's in the data
        .range([4, 50]); // Size in pixel

      // Draw the map
      svg
        .append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("fill", "#d4bea9")
        .attr("d", d3.geoPath().projection(projection))
        .style("stroke", "#faead4");

      const mouseclick = function (e, i) {
        setLocation(i.name);
      };

      // Add circles:
      svg
        .selectAll("myCircles")
        .data(markers)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
          return projection([d.long, d.lat])[0];
        })
        .attr("cy", function (d) {
          return projection([d.long, d.lat])[1];
        })
        .attr("r", function (d) {
          return size(d.size);
        })
        .style("fill", "#a15832")
        .attr("stroke", "#a15832")
        .attr("stroke-width", 3)
        .attr("fill-opacity", 0.3)
        .attr("stroke-opacity", 0)
        .on("click", mouseclick);

      // --------------- //
      // ADD LEGEND //
      // --------------- //
      // Add legend: circles
      var valuesToShow = [10, 50, 100];
      var xCircle = 100;
      var xLabel = 180;
      var yCircle = wHeight - 50;
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("circle")
        .attr("cx", xCircle)
        .attr("cy", function (d) {
          return yCircle - size(d);
        })
        .attr("r", function (d) {
          return size(d);
        })
        .style("fill", "none")
        .attr("stroke", "#524232");

      // Add legend: segments
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("line")
        .attr("x1", function (d) {
          return xCircle + size(d);
        })
        .attr("x2", xLabel)
        .attr("y1", function (d) {
          return yCircle - size(d);
        })
        .attr("y2", function (d) {
          return yCircle - size(d);
        })
        .attr("stroke", "#524232")
        .style("stroke-dasharray", "2,2");

      // Add legend: labels
      svg
        .selectAll("legend")
        .data(valuesToShow)
        .enter()
        .append("text")
        .attr("x", xLabel)
        .attr("y", function (d) {
          return yCircle - size(d);
        })
        .text(function (d) {
          return d;
        })
        .style("font-size", 10)
        .attr("alignment-baseline", "middle");
    });
  }, [height, width, wWidth, wHeight]);

  const showDescription = () => {
    if (location === "") return;

    const info = markers.filter((e) => e.name === location)[0];

    return (
      <div className="map-description__container fade-in">
        <h3>{info.title}</h3>
        <p>{info.description}</p>
      </div>
    );
  };

  return (
    <div className="page-container fade-in">
      <svg ref={ref} width={width} height={height} />
      {showDescription()}
    </div>
  );
};
