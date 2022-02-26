import "./styles.css";
import { useState, useEffect } from 'react';
import { InterfaceFootPrint } from './data/InterfaceFootPrint';

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

  console.log(fpData)

  return (
    <>
      <h1>Ducky</h1>
    </>
    )
}

export default App