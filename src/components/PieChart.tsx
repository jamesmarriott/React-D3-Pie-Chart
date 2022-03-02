import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Legend from './Legend'

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
 
    const pieChartRef = useRef(null)

   // destructure incoming data props
    const { categories } = footPrintData
 
    const pieData = [
    // @ts-ignore
    {item: 'Consumption', percent: categories.consumption.percent},
    // @ts-ignore
    {item: 'Energy', percent: categories.energy.percent},
    // @ts-ignore
    {item: 'Food', percent: categories.food.percent}, 
    // @ts-ignore
    {item: 'Transport', percent: categories.transport.percent}, 
    // @ts-ignore
    {item: 'Public', percent: categories.public.percent}
  ]
  
  useEffect(() => { 
  // define colors
  const colors = d3.scaleOrdinal(['#EF5F8A', '#00A1C9', '#F6BA75', '#673E88', '#3999E3'])
      
  // @ts-ignore
  const piedata = d3.pie().padAngle(.05).value(d => d.percent)(pieData)    
  const svg = d3.select(pieChartRef.current)
                  .style('background-color', 'white')
                  // this sets the size of the container SVG
                  .attr('width', 240)
                  .attr('height', 240)
                    .append('g')
                  // radius dimensions - 50% of the container
                    .attr('transform', 'translate(120, 120)')

  // The outer radius of the pie chart is 2px smaller than the SVG container to accomodate hover fill stroke.
  const arc = d3.arc()
    .innerRadius(94)
    .outerRadius(118)

  svg.append('g')
    .selectAll('path')
    .data(piedata)
    .join('path')
      // @ts-ignore
      .attr('d', arc)
      // @ts-ignore
      .attr('fill', (d,i)=>colors(i))
    // ISSUE: This is where the 2px black stroke is applied and removed on hover.
      .on('mouseover', (event,d) => {
        d3.select(event.currentTarget)
        .style('stroke', 'black')
        .style('stroke-width', '2px')
      })
      .on("mouseout", (event, d) => {
        d3.select(event.currentTarget)
        .style('stroke', 'none')
      })
  })

  return (
    <>
      <svg ref={pieChartRef}>
      </svg>
      <Legend
          pieData={pieData}/>
    </>
  )
}
 
 
 export default PieChart
