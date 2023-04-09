import React, { useEffect, useState } from 'react'
import Modal from './Modal';

function Page({pokemons, currentPage, typeSelectedArray, setSearchedPokemons, searchedPokemons, inputValue}) {
  
  const pageSize = 10;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentPokemons = searchedPokemons.slice(startIndex, endIndex);

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonSrc, setSelectedPokemonSrc] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handlePokemonClick = (pokemon, src) => {
    setSelectedPokemon(pokemon);
    setSelectedPokemonSrc(src);
    setShowModal(true);
  }

  const handleModalClose = () => {
    console.log('close')
    setShowModal(false);
    setSelectedPokemon(null);
    setSelectedPokemonSrc(null);
  }


  useEffect(() => {
    const typeFilteredPokemons = typeSelectedArray
    ? pokemons.filter(pokemon => typeSelectedArray.every(type => pokemon.type.includes(type)))
    : pokemons;
    if (inputValue === '') {
      setSearchedPokemons(typeFilteredPokemons);
      return;
    }
    const typeAndNameFilteredPokemons = typeFilteredPokemons.filter(pokemon => { return pokemon?.name?.english.toLowerCase().includes(inputValue?.toLowerCase()) })
    setSearchedPokemons(typeAndNameFilteredPokemons);
  }, [typeSelectedArray, inputValue, pokemons, setSearchedPokemons])

  return (
    <><div className='pokemon-container'>
        
        
        {currentPokemons.map(pokemon => {
          if (typeSelectedArray.every(type => pokemon.type.includes(type))) {
            return (
              <div key={pokemon.id} className='pokemonResults'>
              <img src={`http://raw.githubusercontent.com/fanzeyi/pokemon.json/master` +
                `/images/${pokemon.id < 10 ? '00' : pokemon.id < 100 ? '0' : ''}${pokemon.id}.png`}
                alt={pokemon.name.english}
                width="200"
                height="200" 
                onClick={() => handlePokemonClick(
                  pokemon,
                  `http://raw.githubusercontent.com/fanzeyi/pokemon.json/master` +
                `/images/${pokemon.id < 10 ? '00' : pokemon.id < 100 ? '0' : ''}${pokemon.id}.png`
                  )}
                />
              </div>);
          } else {
            return [];
          }
        })}
      </div>
      {
        showModal && 
        <Modal pokemon={selectedPokemon} onClose={handleModalClose} selectedPokemonSrc={selectedPokemonSrc} />
      }
      </>
  )
}

export default Page
