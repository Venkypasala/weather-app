import React, { useEffect, useState } from "react";
import './App.css';
import Weather from "./weather";
const https = require('https');


function Body(){

  const [query, setQuery] = useState('');
     const [weather, setWeather] = useState({});
     const [error, setError] = useState(null);
     const [unit,setUnit]=useState("Celsuis");
     const [forecast, setForecast] = useState({});



     const search =(e) => {
        if(e.key === 'Enter') {



            const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+"Metric"+"&appid=0dc1e66435d0ea27458b1d7b87026de8";
            https.get(url,function(res){
              res.on("data",function(data){
                const weatherData=JSON.parse(data);
                setWeather(weatherData);

              });
            });
            const url1="https://api.openweathermap.org/data/2.5/forecast?q="+query+"&appid=0dc1e66435d0ea27458b1d7b87026de8";
            https.get(url1,function(res){
              res.on("data",function(data){
                const forcastdummy=JSON.parse(data);
                setForecast(forcastdummy);

              })
            })



        }
      }

      function OnRadio(e){
        const val=e.target.value;
        let units;
        if(val==="Metric")
        units="Celsuis";
        else{
          units="Fahrenheit";
        }

        setUnit(units);
        const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+val+"&appid=0dc1e66435d0ea27458b1d7b87026de8";
        https.get(url,function(res){
          res.on("data",function(data){
            const weatherData=JSON.parse(data);
            setWeather(weatherData);
          });
        });


      }

  return <div className="main-container">
   <input type="text"className="search"placeholder="Search...and press enter"value={query}onChange={(e) => setQuery(e.target.value)}onKeyPress={search}/>
   <div className="container">
    <input type="radio" id="c-option"checked={unit === "Celsuis"}
                        value="Metric"
                        onChange={OnRadio}
                         name="selector"/>
    <label for="c-option">Metric</label>

    <input type="radio" id="k-option" checked={unit === "Fahrenheit"}
                        value="Imperial"
                        onChange={OnRadio}
                        name="selector"/>
    <label for="k-option">Imperial</label>
    </div>

  {weather.main && (
      <div className="city">
          <h2 className="city-name">
              <span>{weather.name}</span>
              <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
              {Math.round(weather.main.temp)}
              <sup>&deg;{unit}</sup>
          </div>
          <div className="info">
              <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              <p>{weather.weather[0].description}</p>

          </div>
      </div>
  )}

 <Weather
currentweather={weather}
forcast={forecast}
/>




  </div>;
}




export default Body;
