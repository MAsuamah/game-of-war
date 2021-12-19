import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [cpuDeck, setCpuDeck] = useState([])
  const [playerDeck, setPlayerDeck] = useState([])

  const [cpuWar, setCpuWar] = useState([])
  const [playerWar, setPlayerWar] = useState([])

  const [drawnPlCard, setDrawnPlCard] = useState({})
  const [drawnCpCard, setDrawnCpCard] = useState({})
  
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

  const getCardValues = (deck) => {
    const newDeck = deck.map((card) => {
      if(card.value === "JACK") {
        return {...card, value: "11"}
      } else if(card.value === "QUEEN") {
        return {...card, value: "12"}
      } else if(card.value === "KING") {
        return {...card, value: "13"}
      } else if(card.value === "ACE") {
        return {...card, value: "14"}
      } else {
        return {...card}
      }
    })
    return newDeck;
  }

  const isEmpty = obj => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  const startGame = () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      const { cards } = response
      const playersCards = getCardValues(cards)
      setPlayerDeck(playersCards)
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=26`)
    .then(function(response) {
      return response.json()
    })
    .then(function(response) {
      const { cards } = response
      const cpusCards = getCardValues(cards)
      setCpuDeck(cpusCards)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const drawCards = () => {
    const pDeck = playerDeck.slice()
    const cDeck = cpuDeck.slice()

    const drawnPlayerCard = pDeck[0]
    const drawnCpuCard = cDeck[0]

    setDrawnPlCard(drawnPlayerCard)
    setDrawnCpCard(drawnCpuCard)

    if (parseInt(drawnPlayerCard.value) > parseInt(drawnCpuCard.value)) {
      setPlayerDeck(playerDeck.slice(1).concat([drawnPlayerCard, drawnCpuCard]))
      setCpuDeck(cpuDeck.slice(1))
    }

    else if (parseInt(drawnPlayerCard.value) < parseInt(drawnCpuCard.value)) {
      setCpuDeck(cpuDeck.slice(1).concat([drawnPlayerCard, drawnCpuCard]))
      setPlayerDeck(playerDeck.slice(1))
    }

    else if (parseInt(drawnPlayerCard.value) === parseInt(drawnCpuCard.value)){
        war(pDeck, cDeck)  
    }  
  }

  const war = (pDeck, cDeck) => {
    const cWarDeck = cpuWar.slice()
    const pWarDeck = playerWar.slice()

    const pWar = pDeck.slice(1).slice(0,2)
    const cWar = cDeck.slice(1).slice(0,2)

    if (parseInt(pWar[pWar.length-1].value) > parseInt(cWar[cWar.length-1].value)) {
      setPlayerDeck(pDeck.slice(3, pDeck.length).concat([drawnPlCard, drawnCpCard, ...pWar, ...cWar, ...cWarDeck, ...pWarDeck]))
      setCpuDeck(cDeck.slice(3, cDeck.length))
      setCpuWar([])
      setPlayerWar([])
    }

    else if (parseInt(pWar[pWar.length-1].value) < parseInt(cWar[cWar.length-1].value)) {
      setCpuDeck(cDeck.slice(3, cDeck.length).concat([drawnPlCard, drawnCpCard, ...pWar, ...cWar, ...pWarDeck, ...cWarDeck]))
      setPlayerDeck(pDeck.slice(3, pDeck.length))
      setCpuWar([])
      setPlayerWar([])
    }

    else if (parseInt(pWar[pWar.length-1].value) === parseInt(cWar[cWar.length-1].value)) {
      setCpuDeck(cDeck.slice(3, cDeck.length))
      setPlayerDeck(pDeck.slice(3, pDeck.length))
      setCpuWar([...cpuWar, ...cWar])
      setPlayerWar([...pWar, ...cWar])
      war()
    } 
  }

  useEffect(() => {
    console.log(drawnPlCard)
    console.log(drawnCpCard)

  }, [drawnPlCard, drawnCpCard])

  return (
    <div>
      <div>
        <button onClick={() => startGame()}>Start Game</button>
        <button onClick={() => drawCards()}>Draw Cards</button>
      </div>
      <div>
        {!isEmpty(drawnPlCard) && (
          <img alt="player's drawn card" src={drawnPlCard.image}></img>
        )} 
        {!isEmpty(drawnCpCard) && (
          <img alt="computer's drawn card" src={drawnCpCard.image}></img>
        )}       
      </div>
    </div>
  );
}

export default App;
