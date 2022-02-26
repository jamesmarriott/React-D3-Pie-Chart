import { RadialChart, LabelSeries } from "react-vis";
import { useState, useEffect } from 'react';

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
     const publicPer = categories.public.percent

    const [data, setData] = useState([
        { angle: consumption.percent, color: "#EF5F8A", style: { stroke: "black" }},
        { angle: energy.percent, color: "#00A1C9"},
        { angle: food.percent, color: "#F6BA75" },
        { angle: transport.percent, color: "#673E88" },
        { angle: publicPer, color: "#3999E3" },
      ]);

return (
   
   <>
    {data ? 
      <RadialChart
        colorType="literal"
        padAngle={.03}
        innerRadius={96}
        radius={120}
        data={data}
        color={d => d.color}
        width={250}
        height={250}
        showLabels={true}
    />
    : <h1>not ad</h1>}
   </>
 )
 }
 
 
 export default PieChart
