import "./legend-styles.css"
import consumptionicon from '.././assets/icons/consumption.svg'
import energyicon from '.././assets/icons/energy.svg'
import foodicon from '.././assets/icons/food.svg'
import publicicon from '.././assets/icons/public.svg'
import transporticon from '.././assets/icons/transport.svg'

type IFootPrintProps = {
    pieData : { item: string; percent: number }[]
}

const Legend: React.FC<IFootPrintProps>  = ({
    pieData 
}) => {

  return (
    <table className='legend'>
      <thead>
      <tr>
        <td><img src={consumptionicon} alt="consumption icon"></img></td>
        <td><img src={energyicon} alt="energy icon"></img></td>
        <td><img src={foodicon} alt="food icon"></img></td>
        <td><img src={transporticon} alt="transport icon"></img></td>
        <td><img src={publicicon} alt="public icon"></img></td>
      </tr>
      <tr>
        <th>{pieData[0].item}</th>
        <th>{pieData[1].item}</th>
        <th>{pieData[2].item}</th>
        <th>{pieData[3].item}</th>
        <th>{pieData[4].item}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{Math.round(pieData[0].percent)}%</td>
        <td>{Math.round(pieData[1].percent)}%</td>
        <td>{Math.round(pieData[2].percent)}%</td>
        <td>{Math.round(pieData[3].percent)}%</td>
        <td>{Math.round(pieData[4].percent)}%</td>
      </tr>
      </tbody>
    </table>
  )
}
 
export default Legend