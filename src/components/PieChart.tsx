import { useState, useEffect } from 'react';
import * as d3 from 'd3';
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
 

    const { 
        categories: { consumption },
        categories: { energy }, 
        categories: { food },
        categories: { transport },
     } = footPrintData

     const { categories } = footPrintData
     // next line not allowed to destructure using reserved 'public' keyword
     const publicPer = categories.public.percent

    const [data, setData] = useState([
        { angle: consumption.percent, color: "#EF5F8A"},
        { angle: energy.percent, color: "#00A1C9"},
        { angle: food.percent, color: "#F6BA75" },
        { angle: transport.percent, color: "#673E88" },
        { angle: publicPer, color: "#3999E3" },
      ]);

    const [pieData, setPieData] = useState([ consumption.percent, energy.percent, food.percent, transport.percent, publicPer])

      
      useEffect(() => {
        const svg = d3.select("svg")	
        const width = 240
        const height = 240
        const radius = Math.min(width, height) / 2
    
        const g = svg.append('g')
        .attr('transform', 'translate('+ width / 2 + ',' + height / 2 + ')');
    
        const color = d3.scaleOrdinal(['#EF5F8A', '#00A1C9', '#F6BA75', '#673E88', '#3999E3'])
        const pie = d3.pie();
        const arc = d3.arc()
            .innerRadius(108)
            .outerRadius(radius);
        const arcs = g.selectAll('arc')
            .data(pie(pieData))
            .enter().append('g')
            .attr('class','arc')
        
        arcs.append('path')
          .attr('fill',function(i){
            return color(i)
          })
          .attr('d', arc);
      }, []);
    
      return (
        <div className='pieChart'>
          <svg width="250" height="250">
          </svg>
        </div>
      )
 }
 
 
 export default PieChart
