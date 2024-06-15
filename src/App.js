import {useState} from "react"

import searchIcon from "./Components/Assets/searchIcon.png"
import cloud from "./Components/Assets/cloud1.png"
import humidityImg from "./Components/Assets/humidity.png"

import './App.css';
function App() {
  const [city,setCity] = useState("")
  const [name ,setName] = useState("")
  const [humidity,setHumidity] = useState(0)
  const [temp,setTemp] = useState(0)
  const [error,setError] = useState("")

  
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=10113c7c97034c9a3ea572ec0d9e1f9a`
  const changeHandler = async ()=>{
    const response = await fetch(api)
    const data = await response.json()
    console.log(data)
    if (data.cod === 200){
      let tempInKelvin = data.main.temp
    let celsius = Math.round(tempInKelvin - 273)
    setTemp(celsius)
    let name = data.name
    let humidity = data.main.humidity
    setHumidity(humidity)
    setName(name)
    setError("")
    // console.log(name)
    // console.log(tempInKelvin)
    }else{
      const codeError = data.message
      setError(codeError)
      setName("")
      setHumidity("0")
      setTemp("0")
      
    }
    
  }
  
  return (
    <div className="App">
      <center>
        <h1 className="heading" >Weather Application</h1>
        <div className="input-container">
          <input type = "text" placeholder="Search" onChange = {(e)=>setCity(e.target.value)} class = "input" />
          <div onClick = {() => {changeHandler()}}>
            <img src = {searchIcon} alt = "search" />
          </div>
        </div>
        <div className="cloud">
          <img src = {cloud} alt = "cloud" />
        </div>
        <div>
          <h1 className="name">{name}</h1>
          <h1 className="name">{temp}° C</h1>
        </div>
        <div>
          <div className="humidity-container">
            <img src = {humidityImg} alt = "humidity" className="humidity"/>
            <h3>{humidity}</h3>
          </div>

        </div>
        <div className="error-container">
      <p className="error">{error}</p>
      </div>
      </center>
      
    </div>
  );
}

export default App;
