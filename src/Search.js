import React, { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

function Search({ setTypeSelectedArray, typeSelectedArray, inputValue, setInputValue}) {
  const [types, setTypes] = useState([])
  
  // this function will be called only once when the component is mounted
  useEffect(() => {
    async function fetchTypes() {
      const response = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json')
      setTypes(response.data.map(type => type.english))
    }
    fetchTypes()
  }, [])


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClickF = (e) => {
    const { value, checked } = e.target
    
    if (checked) {
      setTypeSelectedArray(typeSelectedArray => [...typeSelectedArray, value])
    } else {
      setTypeSelectedArray(typeSelectedArray => typeSelectedArray.filter(type => type !== value))
    }
  }


  return (
    <div>
      <div className='search-container'>
      <input
        type="text"
        className="search-field"
        placeholder="Search for a Pokémon"
        onChange={handleInputChange}
        value={inputValue}
      />
      </div>
      <div className="checkbox-container">
        {types.map(type => (
          <div key={type} className="searchCheckboxes">
          <input
            type="checkbox"
            value={type}
            id={type}
            onChange={handleClickF}
          />
          <label htmlFor={type}>{type}</label>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Search