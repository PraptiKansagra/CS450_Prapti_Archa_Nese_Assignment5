import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const CorrelationMatrix = ({ data, variables }) => {
  const chartRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    const svg = d3.select(chartRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 50, right: 50, bottom: 50, left: 50 };
    const width = 500 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const matrix = [];
    variables.forEach((rowVar, i) => {
      variables.forEach((colVar, j) => {
        matrix.push({
          rowVar,
          colVar,
          value: i === j ? 1 : d3.mean(data, d => d[rowVar] * d[colVar])
        });
      });
    });

    const x = d3.scaleBand()
      .domain(variables)
      .range([margin.left, width - margin.right]);

    const y = d3.scaleBand()
      .domain(variables)
      .range([margin.top, height - margin.bottom]);

    const color = d3.scaleSequential(d3.interpolateRdBu)
      .domain([-1, 1]);

    svg.selectAll()
      .data(matrix)
      .enter().append('rect')
      .attr('x', d => x(d.colVar))
      .attr('y', d => y(d.rowVar))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => color(d.value));

    svg.selectAll()
      .data(matrix)
      .enter().append('text')
      .attr('x', d => x(d.colVar) + x.bandwidth() / 2)
      .attr('y', d => y(d.rowVar) + y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('fill', d => d3.lab(color(d.value)).l > 70 ? 'black' : 'white')
      .text(d => d3.format('.2f')(d.value));
    
    svg.append('g')
      .attr('transform', `translate(0,${margin.top})`)
      .call(d3.axisLeft(y));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisTop(x));
  };

  return <svg ref={chartRef} width={500} height={500} />;
};

export default CorrelationMatrix;
