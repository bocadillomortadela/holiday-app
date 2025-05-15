import React, { useEffect, useState } from 'react'
import './Holiday.css'
export const Holiday = () => {
  const [Country, setCountry] = useState([])
  const [selectedIsoCode, setSelectedIsoCode] = useState('')
  const [Holidays, setHolidays] = useState([])
  console.log(Country)
  console.log(selectedIsoCode)

  useEffect(() => {
    const url = 'https://openholidaysapi.org/Countries?languageIsoCode=ES'
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data)
        setSelectedIsoCode(data[0].isoCode)
      })
  }, [])

  useEffect(() => {
    if (!selectedIsoCode) return
    const url = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selectedIsoCode}&validFrom=2023-01-01&validTo=2023-12-31&languageIsoCode=EN`
    console.log('🌍 Fetching holidays con:', selectedIsoCode)
    console.log(url)

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('🔍 Datos de holidays:', data)
        setHolidays(data)
      })
  }, [selectedIsoCode])

  return (
    <div className='holiday-app'>
      <h1>HOLIDAY APP</h1>
      <select value={selectedIsoCode} onChange={(e) => setSelectedIsoCode(e.target.value)}>
        {Country.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name[0].text}
          </option>
        ))}
      </select>
      {Holidays.map((h, i) => (
        <div key={i} className='holiday-card'>
          <p>{h.name[0].text}</p>
          <p>{h.startDate}</p>
        </div>
      ))}
    </div>
  )
}

export default Holiday
