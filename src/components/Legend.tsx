import "./legend-styles.css"
import { useState, useEffect, useRef } from 'react';
import consumptionicon from '.././assets/icons/consumption.svg'
import energyicon from '.././assets/icons/energy.svg'
import foodicon from '.././assets/icons/food.svg'
import publicicon from '.././assets/icons/public.svg'
import transporticon from '.././assets/icons/transport.svg'
import { pie } from "d3";

type IFootPrintProps = {
    pieData : { item: string; value: number }[]
}

const Legend: React.FC<IFootPrintProps>  = ({
    pieData 
 }) => {

    console.log(pieData)

return (

    <table className='legend'>
      <tr>
        <th><img src={consumptionicon} alt="consumption icon"></img></th>
        <th><img src={energyicon} alt="energy icon"></img></th>
        <th><img src={foodicon} alt="food icon"></img></th>
        <th><img src={transporticon} alt="transport icon"></img></th>
        <th><img src={publicicon} alt="public icon"></img></th>
      </tr>
      <tr>
        <th>{pieData[0].item}</th>
        <th>{pieData[1].item}</th>
        <th>{pieData[2].item}</th>
        <th>{pieData[3].item}</th>
        <th>{pieData[4].item}</th>
    </tr>
      <tr>
        <td>{Math.round(pieData[0].percent)}%</td>
        <td>{Math.round(pieData[1].percent)}%</td>
        <td>{Math.round(pieData[2].percent)}%</td>
        <td>{Math.round(pieData[3].percent)}%</td>
        <td>{Math.round(pieData[4].percent)}%</td>
      </tr>
    </table>
 )
 }
 
 
 export default Legend