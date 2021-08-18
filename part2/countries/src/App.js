import React, { useEffect, useState } from 'react';

const api_key = process.env.REACT_APP_API_KEY

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    const url =
      `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
    fetch(url)
      .then(res => res.json())
      .then(res => setWeather(res.current))
  }, [])
  console.log(weather);
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital: {country.capital}</p>
      <p>pupulation: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(lan => <li key={lan.iso639_2}>{lan.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="190px" height="100px"></img>
      <h3>Weather in {country.capital}</h3>
      <p><strong>temperature: </strong>{weather.temperature} Celsius {weather.weather_descriptions}</p>
      <div><strong>wind: </strong>{weather.wind_speed} mph, direction {weather.wind_dir}</div>
      <img src={weather.weather_icons} alt="weatherIcon" width="50px" height="50px"></img> <br />
    </div>
  )
}

const CountryShow = ({ countries }) => {

  const [clicks, setClick] = useState(new Array(countries.length).fill(false))

  if (countries.length === 1)
    return <CountryInfo country={countries[0]} />

  else if (countries.length > 10)
    return <p>Too many matches, specify another filter</p>

  return (

    <ul>
      {countries.map((c, index) =>
        <li key={c.alpha3Code}> {c.name}
          <button onClick={() => {
            const cpy = [...clicks]
            cpy[index] = !cpy[index]
            setClick(cpy)
          }}>{clicks[index] ? "hide" : "show"}</button>
          {clicks[index] ? <CountryInfo country={c} /> : <br />}
        </li>
      )}
    </ul>
  )
}

const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountries] = useState([])
  const handleInputChange = e => setInput(e.target.value)

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(response => setCountries(response))
  }, [])

  const countriesToShow = countries.filter(country =>
    new RegExp(input, 'i').test(country.name))

  return (
    <div>
      <div>find countries
        <input
          value={input}
          onChange={handleInputChange} />
      </div>
      <CountryShow countries={countriesToShow} />
    </div>
  )
}

export default App;
