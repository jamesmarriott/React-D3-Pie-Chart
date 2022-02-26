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
        // categories: { public }, 
        categories: { transport }, 
        
     } = footPrintData




return (
   
   <>
       <div>
           <p>Food:{consumption.co2mg}</p>
           <p>Consumption: {energy.co2mg}</p>
           <p>Energy: {food.co2mg}</p>
           {/* <p>Transport: {public.co2mg}</p> */}
           <p>Public: {transport.co2mg}</p>
        </div>
   </>
 )
 }
 
 
 export default PieChart