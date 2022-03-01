import "./legend-styles.css"
import { useState, useEffect, useRef } from 'react';
import consumptionicon from '.././assets/icons/consumption.svg'
import energyicon from '.././assets/icons/energy.svg'
import foodicon from '.././assets/icons/food.svg'
import publicicon from '.././assets/icons/public.svg'
import transporticon from '.././assets/icons/transport.svg'


const Legend: React.FC = ({
 
 }) => {

return (

    <table className='legend'>
      <tr>
        <th><img src={foodicon} alt="consumption icon"></img></th>
        <th><img src={consumptionicon}></img></th>
        <th><img src={energyicon}></img></th>
        <th><img src={transporticon}></img></th>
        <th><img src={publicicon}></img></th>
      </tr>
      <tr>
        <th>Food</th>
        <th>Consumption</th>
        <th>Energy</th>
        <th>Transport</th>
        <th>Public</th>
    </tr>
      <tr>
        <td>39%</td>
        <td>25%</td>
        <td>15%</td>
        <td>10%</td>
        <td>0%</td>
      </tr>
    </table>
 )
 }
 
 
 export default Legend