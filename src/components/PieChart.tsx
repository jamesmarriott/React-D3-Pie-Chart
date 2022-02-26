import { RadialChart, LabelSeries } from "react-vis";
import { useState, useEffect, useRef } from 'react';
import { Legend } from 'Legend';

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
     // addded because typescript won't let me destructure using reserved 'public' keyword
     const publicPer = categories.public.percent

     useEffect(() => {
        console.log(chartRef)
	}, [chartRef]);

    const [data, setData] = useState([
        { angle: consumption.percent, color: "#EF5F8A"},
        { angle: energy.percent, color: "#00A1C9"},
        { angle: food.percent, color: "#F6BA75" },
        { angle: transport.percent, color: "#673E88" },
        { angle: publicPer, color: "#3999E3" },
      ]);

return (

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
 )
 }
 
 
 export default PieChart
