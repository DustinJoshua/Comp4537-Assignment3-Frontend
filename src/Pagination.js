import React from 'react';
import './style.css';

function Pagination({ currentPage, pokemons, setCurrentPage, searchedPokemons }) {
  const pageSize = 10;
  const pagesCount = Math.ceil(searchedPokemons.length / pageSize);
  const maxPageButtonCount = 10;

  let pageButtons = [];
  if (pagesCount <= maxPageButtonCount) {
    pageButtons = Array.from({ length: pagesCount }, (_, i) => i + 1);
  } else {
    let startPage = currentPage - Math.floor(maxPageButtonCount / 2);
    if (startPage < 1) {
      startPage = 1;
    } else if (startPage + maxPageButtonCount - 1 > pagesCount) {
      startPage = pagesCount - maxPageButtonCount + 1;
    }
    pageButtons = Array.from({ length: maxPageButtonCount }, (_, i) => startPage + i);
  }

  return (
    <div className='pagination'>
      {currentPage !== 1 && (
        <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
      )}
      {pageButtons.map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          className={currentPage === page ? 'btnActive' : ''}
        >
          {page}
        </button>
      ))}
      {currentPage !== pagesCount && (
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      )}
    </div>
  );
}

export default Pagination;