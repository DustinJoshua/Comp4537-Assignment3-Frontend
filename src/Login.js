import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Dashboard from './Dashboard'
import Search from './Search'
import Page from './Page'
import Pagination from './Pagination'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')
  const [user, setUser] = useState(null)

  const [pokemons, setPokemons] = useState([]);
  const [searchedPokemons, setSearchedPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeSelectedArray, setTypeSelectedArray] = useState([]);
  const [inputValue, setInputValue] = useState('')

  

  const onClickHandle = async (e) => {
    e.preventDefault()
    const res = await axios.post('https://comp4537-assignment3-dustin-lott.onrender.com/login',
    {
        username: username,
        password: password
    })
    console.log(res.data)
    setUser(res.data)
    setAccessToken(res.headers['auth-token-access'])
    setRefreshToken(res.headers['auth-token-refresh'])
    getPokemons(res.headers['auth-token-access'])
  }

  const getPokemons = async (accessTokenString) => {
    const res = await axios.get('https://comp4537-assignment3-dustin-lott.onrender.com/api/v1/pokemons?count=809', {
      headers: {
        'auth-token-access': accessTokenString,
      }
    });
    setPokemons(res.data);
    setSearchedPokemons(res.data);
  }

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get('https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json');
  //     setPokemons(result.data);
  //     setSearchedPokemons(result.data);
  //   }
  //   fetchData();
  // }, [])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get('http://localhost:6001/api/v1/pokemons?count=809', {
  //       headers: {
  //         'auth-token-access': accessToken,
  //       }
  //     });
  //     setPokemons(result.data);
  //     setSearchedPokemons(result.data);
  //   }
  //   fetchData();
  // }, [])


  return (
    <div>
      
      {
        (accessToken) &&
        <div className='root-div'>
        <Search
        inputValue={inputValue}
        setInputValue={setInputValue}
        setTypeSelectedArray={setTypeSelectedArray}
        typeSelectedArray={typeSelectedArray}
        />
        <Page 
        inputValue={inputValue}
        searchedPokemons={searchedPokemons}
        setSearchedPokemons={setSearchedPokemons}
        typeSelectedArray={typeSelectedArray}
        currentPage={currentPage}
        pokemons={pokemons}
        />
        <Pagination 
        searchedPokemons={searchedPokemons}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        pokemons={pokemons}
        />
        </div>
      }

      { 
      (accessToken && user?.role === "admin") &&
      <Dashboard 
      accessToken={accessToken} 
      refreshToken={refreshToken} 
      setAccessToken={setAccessToken}
      />
      } 


      {

       (!accessToken) &&
       <form onSubmit={onClickHandle} className="login-form">
       <h1>Login</h1>
       <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
       <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
       <button type="submit">Login</button>
     </form>
      }

    </div>
  )
}

export default Login