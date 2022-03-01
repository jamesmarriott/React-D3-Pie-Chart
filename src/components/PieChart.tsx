import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Legend from './Legend';
import "./pie-styles.css";

type IFootPrintProps = {
    footPrintData : {
      categories: {
          consumption: { co2mg: number; percent: number }[];
          energy: { co2mg: number; percent: number }[];
          food: { co2mg: number; percent: number }[];
          public: { co2mg: number; percent: number }[];
          transport: { co2mg: number; percent: number }[];
        }[];
        totalCo2mg: number;
    }
}

const PieChart: React.FC<IFootPrintProps> = ({
    footPrintData
 }) => {
 
    // destructure incoming data props

    const pieChart = useRef()

    const { 
        categories: { consumption },
        categories: { energy }, 
        categories: { food },
        categories: { transport },
     } = footPrintData

     const { categories } = footPrintData
     // next line not allowed to destructure using reserved 'public' keyword
     const publicPer = categories.public.percent

     // assign data in a d3 piechart friendly format 

     const pieData = [ 
      {item: 'Consumption', percent: consumption.percent},
      {item: 'Energy', percent: energy.percent},
      {item: 'Food', percent: food.percent}, 
      {item: 'Transport', percent: transport.percent}, 
      {item: 'Public', percent: publicPer}
    ]
  
    useEffect(() => {
    // define colors
    const colors = d3.scaleOrdinal(['#EF5F8A', '#00A1C9', '#F6BA75', '#673E88', '#3999E3'])
    
    const piedata = d3.pie().padAngle(.05).value(d => d.percent)(pieData)
    
    const arc = d3.arc()
        .innerRadius(96)
        .outerRadius(120);
    
    const svg = d3.select(pieChart.current)
                    .attr('width', 240)
                    .attr('height', 240)
                      .append('g')
                      .attr('transform', 'translate(120, 120)')

    svg.append('g')
      .selectAll('path')
      .data(piedata)
      .join('path')
        .attr('d', arc)
        .attr('fill', (d,i)=>colors(i))

  }, []);
  
    return (
      <>
      <div id='pieChart'>
        <svg ref={pieChart}>
        </svg>
      </div>
      <Legend
          pieData={pieData}/>
      </>
    )
 }
 
 
 export default PieChart
