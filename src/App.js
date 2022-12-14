import React, { useEffect, useState } from "react"
import "./App.css"

function App() {
  const [data, setData] = useState([])

  const getFormattedDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fi-FI')
  }

  const getFormattedTime = (timeStr: string) => {
    const time = new Date(timeStr)
    // time string in fi-FI would result 00.00.00 (it-IT results 00:00:00)
    return time.toLocaleTimeString('it-IT')
  }

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:3001/api`)
        .then((response) => response.json())
        .then((actualData) => {
          console.log(actualData)
          setData(actualData)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
    fetchData()
  }, [])
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Solar Panels (High)</th>
            <th>Storage Tank (Low)</th>
            <th>Fireplace (High)</th>
            <th>Oil Burner (High)</th>
            <th>Storage Tank (High)</th>
            <th>Solar Pump</th>
            <th>Fireplace Pump</th>
            <th>Oil Burner Pump</th>
            <th>Current Power (kW)</th>
            <th>Daily Power (kWh)</th>
            <th>Weekly Power (kWh)</th>
            <th>Monthly Power (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((m) => (
            <tr key={m._id}>
              <td>{getFormattedDate(m.dateTime)}</td>
              <td>{getFormattedTime(m.dateTime)}</td>
              <td>{m.solarPanelsHigh}</td>
              <td>{m.storageTankLow}</td>
              <td>{m.fireplaceHigh}</td>
              <td>{m.oilBurnerHigh}</td>
              <td>{m.storageTankHigh}</td>
              <td>{m.solarPump}</td>
              <td>{m.fireplacePump}</td>
              <td>{m.oilBurnerPump}</td>
              <td>{m.currentPowerkW}</td>
              <td>{m.dailyPowerkWh}</td>
              <td>{m.weeklyPowerkWh}</td>
              <td>{m.monthlyPowerkWh}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
