import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [cpuDeck, setCpuDeck] = useState([])
  const [playerDeck, setPlayerDeck] = useState([])
  const [deckId, setDeckId] = useState('')


  useEffect(() => {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(function(response) {
      return response.json()
    })
    .then(function(response){
      console.log(response)
      setDeckId(response.deck_id)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [])

  const startGame = () => {
    console.log(deckId)

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      const { cards } = response
      setPlayerDeck(cards)
    })

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
        const { cards } = response
        setCpuDeck(cards)
    })
  }

  const drawCards = () => {
    const pDeck = playerDeck.slice()
    const cDeck = cpuDeck.slice()

    const drawnPlayerCard = pDeck[0]
    const drawnCpuCard = cDeck[0]

    console.log(drawnPlayerCard)
    console.log(drawnCpuCard)

    const newPDeck = pDeck.slice(1)
    const newCpuDeck = cDeck.slice(1)

    setPlayerDeck(newPDeck)
    setCpuDeck(newCpuDeck)

  }

  useEffect(() => {
    console.log(playerDeck)
    console.log(cpuDeck)
  }, [playerDeck, cpuDeck])


  return (
    <div>
      <button onClick={() => startGame()}>Start Game</button>
      <button onClick={() => drawCards()}>Draw Cards</button>
    </div>
  );
}

export default App;
