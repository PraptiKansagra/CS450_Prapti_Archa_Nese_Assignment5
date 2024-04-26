/*
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Scatterplot = ({ data, xVariable, yVariable }) => {
    const chartRef = useRef(null);

    const drawChart = () => {
        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d[xVariable]))
            .nice()
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d[yVariable]))
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        svg.selectAll('.dot')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(d[xVariable]))
            .attr('cy', d => y(d[yVariable]))
            .attr('r', 3)
            .style('fill', 'steelblue');
    };
    useEffect(() => {
        drawChart();
    drawChart();
}, [data, xVariable, yVariable]);

    return <svg ref={chartRef} width={500} height={500} />;
};

export default Scatterplot;

*/

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Scatterplot = ({ data, xVariable, yVariable }) => {
    const chartRef = useRef();

    useEffect(() => {
        drawChart();
    }, [data]);

    const drawChart = () => {
        const svg = d3.select(chartRef.current);
        svg.selectAll('*').remove();

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = 500 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        const x = d3.scaleLinear()
            .domain(d3.extent(data, d => d[xVariable]))
            .nice()
            .range([margin.left, width - margin.right]);

        const y = d3.scaleLinear()
            .domain(d3.extent(data, d => d[yVariable]))
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append('g')
            .attr('transform', `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x));

        svg.append('g')
            .attr('transform', `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        svg.selectAll('.dot')
            .data(data)
            .enter().append('circle')
            .attr('class', 'dot')
            .attr('cx', d => x(d[xVariable]))
            .attr('cy', d => y(d[yVariable]))
            .attr('r', 3)
            .style('fill', 'steelblue');
    };

    return <svg ref={chartRef} width={500} height={500} />;
};

export default Scatterplot;

