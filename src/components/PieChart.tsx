import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import Legend from './Legend'
import './pie-styles.css'

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
    {item: 'Consumption', percent: categories.consumption.percent, value: categories.consumption.co2mg},
    // @ts-ignore
    {item: 'Energy', percent: categories.energy.percent, value: categories.energy.co2mg},
    // @ts-ignore
    {item: 'Food', percent: categories.food.percent, value: categories.food.co2mg}, 
    // @ts-ignore
    {item: 'Transport', percent: categories.transport.percent, value: categories.transport.co2mg}, 
    // @ts-ignore
    {item: 'Public', percent: categories.public.percent, value: categories.public.co2mg}
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

  // Create the tooltip div
  const tooldiv = d3.select('#pieChartDiv')
                    .append('div')
                    .style('visibility', 'hidden')
                    .style('position', 'absolute')
                    .style('padding', '10px')
                    .style('max-width', '100px')
                    .style('text-align', 'center')
                    .style('overflow', 'hidden')
                    .style('background-color', '#E5e5e5')

  svg.append('g')
    .selectAll('path')
    .data(piedata)
    .join('path')
      // @ts-ignore
      .attr('d', arc)
      // @ts-ignore
      .attr('fill', (d,i)=>colors(i))
    // ISSUE: This is where the 2px black stroke is applied and removed on hover.
      .on('mouseenter', (event, d) => {
        console.log("over")
        d3.select(event.currentTarget)
        .style('stroke', 'black')
          .transition()
          .style('stroke', 'black')
        .style('stroke-width', '2px')
        tooldiv.style('visibility', 'visible')
              // @ts-ignore
                .text( `${d.data.item}` + ": " + `${Math.round(d.data.percent)}%` + " co2: " + `${Math.round(d.data.value).toLocaleString()}`)
        tooldiv.style('top', `${event.pageY-100}px`)
        .style('left', `${event.pageX-25}px`)
      })
      .on('mouseout', (event, d) => {
        console.log("out")
        d3.select(event.currentTarget)
        .style('stroke', 'none')
          .transition()
          .style('stroke', 'none')
        tooldiv.style('visibility', 'hidden')
      })

  })

  return (
    <>
        <div id="pieChartDiv">
          <svg ref={pieChartRef}>
          </svg>
        </div>
    <Legend
      pieData={pieData}/>
    </>
  )
}
 
 
 export default PieChart
