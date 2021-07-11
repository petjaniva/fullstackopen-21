import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState("")
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() =>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []
  )

  const filterCountries = (event) => {
    setCountryFilter(event.target.value)
    setFilteredCountries(
      countries.filter(
        (country) =>
        country.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1
      )
    )
    
  }
  const ShowCountries = () => {
    if (filteredCountries.length!==1){
    return (
      filteredCountries.map((country) => (
        <p key={country.name}>{country.name}</p>
      ))
    )
      }
      else {
        return <ShowCountry />
      }
   }
   
   const ShowCountry = () => {
     const country = filteredCountries[0]
     return (
      <div>
          <h1>{country.name}</h1>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <h3>Spoken languages:</h3>
          <ul>
            {country.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt={country.name} width="100px"/>
     </div>
     )
   }
  return (
  <div>filter: 
    <input value={countryFilter} onChange={filterCountries} />
    {filteredCountries.length > 10 
    ?(<p>Too many matches, specify another filter</p>)
    : <ShowCountries />}
  </div>)
}

export default App