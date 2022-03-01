import { useEffect, useRef, useState } from 'react';
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
 
    const pieChartRef = useRef()

   // destructure incoming data props
     const { categories } = footPrintData

     const [pieData, setPieData] = useState([ 
      {item: 'Consumption', percent: categories.consumption.percent},
      {item: 'Energy', percent: categories.energy.percent},
      {item: 'Food', percent: categories.food.percent}, 
      {item: 'Transport', percent: categories.transport.percent}, 
      {item: 'Public', percent: categories.public.percent}
    ])
  
    useEffect(() => {
    // define colors
    const colors = d3.scaleOrdinal(['#EF5F8A', '#00A1C9', '#F6BA75', '#673E88', '#3999E3'])
    
    const piedata = d3.pie().padAngle(.05).value(d => d.percent)(pieData)
    
    const arc = d3.arc()
        .innerRadius(96)
        .outerRadius(120);
        
    
    const svg = d3.select(pieChartRef.current)
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
        .attr('stroke', 'white')
        .on('mouseover', (event,d) => {
          d3.select(event.currentTarget)
          .style("stroke", "black")
          .style('stroke-width', '2px');
        })
        .on("mouseout", (event, d) => {
          d3.select(event.currentTarget)
          .style('stroke', 'white')
        })
    })
  
    return (
      <>
      <div>
        <svg ref={pieChartRef}>
        </svg>
      </div>
      <Legend
          pieData={pieData}/>
      </>
    )
 }
 
 
 export default PieChart
