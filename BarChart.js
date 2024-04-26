import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, xVariable, yVariable }) => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d[xVariable]))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yVariable])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45)');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d[xVariable]))
      .attr('y', d => y(d[yVariable]))
      .attr('width', x.bandwidth())
      .attr('height', d => height - margin.bottom - y(d[yVariable]));

    svg.selectAll('.label')
      .data(data)
      .enter().append('text')
      .attr('class', 'label')
      .attr('x', d => x(d[xVariable]) + x.bandwidth() / 2)
      .attr('y', d => y(d[yVariable]) - 5)
      .attr('text-anchor', 'middle')
      .text(d => d[yVariable]);
  };

  return <svg ref={chartRef} width={600} height={400} />;
};

export default BarChart;
