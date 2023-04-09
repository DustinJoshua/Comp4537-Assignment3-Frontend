import React from 'react';
import './style.css';

function Modal({ pokemon, onClose, selectedPokemonSrc }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <img
          src={selectedPokemonSrc}
          alt={pokemon.name.english}
          width="200"
          height="200"
        />
        <h2>{pokemon.name.english}</h2>
        <h4 className='typesHeading'>Types</h4>

          {pokemon.type.map((type, index) => (
            <p key={index}>{type}</p>
          ))}

        <h4 className='statsHeading'>Stats</h4>
          <p>HP: {pokemon.base.HP}</p>
          <p>Attack: {pokemon.base.Attack}</p>
          <p>Defense: {pokemon.base.Defense}</p>
          <p>Speed Attack: {pokemon.base['Speed Attack']}</p>
          <p>Speed Defense: {pokemon.base['Speed Defense']}</p>
          <p>Speed: {pokemon.base.Speed}</p>
      </div>
    </div>
  );
}

export default Modal;