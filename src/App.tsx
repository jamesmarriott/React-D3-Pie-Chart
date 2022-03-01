import { useState, useEffect } from 'react';
import { InterfaceFootPrint } from './data/InterfaceFootPrint';
import "@fontsource/hind"
import "@fontsource/montserrat"
import PieChart from './components/PieChart'
import './global-styles.css'

const App: React.FC = () => {

  const [fpData, setFpData] = useState<InterfaceFootPrint | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data: InterfaceFootPrint = await (await fetch("https://storage.googleapis.com/ducky_static_assets/helpers/footprintExercise.json")).json()
      setFpData(data)
    }
    fetchData()
  .catch(console.error)
  }, [])



  return (
    <>
      {fpData ? 
      <PieChart
        footPrintData={fpData}
      />
       : <h1>Loading</h1>}
    </>
    )
}

export default App