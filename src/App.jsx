import React from 'react'
import { BrowserRouter as Router, Routes, Route, useMatch } from 'react-router-dom'//eslint-disable-line no-unused-vars
import { useApi } from './useApi'
import LoadingSpinner from './LoadingSpinner'
import ErrorMessage from './ErrorMessage'
import PokemonPage from './PokemonPage'
import PokemonList from './PokemonList'

const mapResults = (({ results }) => results.map(({ url, name }) => ({
  url,
  name,
  id: parseInt(url.match(/\/(\d+)\//)[1])
})))

const App = () => {
  const match = useMatch('/pokemon/:name')
  const { data: pokemonList, error, isLoading } = useApi('https://pokeapi.co/api/v2/pokemon/?limit=50', mapResults)
  console.log('pokemonList=', pokemonList)//eslint-disable-line no-console

  if (isLoading) {
    return <LoadingSpinner />
  }
  if (error) {
    return <ErrorMessage error={error} />
  }

  let next = null
  let previous = null

  if (match && match.params) {
    const pokemonId = pokemonList.find(({ name }) => name === match.params.name).id
    previous = pokemonList.find(({ id }) => id === pokemonId - 1)
    next = pokemonList.find(({ id }) => id === pokemonId + 1)
    console.log('pokemonId=', pokemonId)//eslint-disable-line no-console
    console.log('previous=', previous)//eslint-disable-line no-console
    console.log('next=', next)//eslint-disable-line no-console
  }

  return (
    <Routes>
      <Route exact path='/' element={<PokemonList pokemonList={pokemonList} />} />
      <Route exact path='/pokemon/:name' element={
        <PokemonPage pokemonList={pokemonList} previous={previous} next={next} />
      } />
    </Routes>
  )
}

export default App
