import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [startGameBtn, setStartGameBtn] = useState(true)
  const [drawBtn, setdrawBtn] = useState(false)

  const [deckId, setDeckId] = useState('')

  const [cpuDeck, setCpuDeck] = useState([])
  const [playerDeck, setPlayerDeck] = useState([])

  const [drawnPlCard, setDrawnPlCard] = useState({})
  const [drawnCpCard, setDrawnCpCard] = useState({})

  const [cpuWar, setCpuWar] = useState([])
  const [playerWar, setPlayerWar] = useState([])

//Get full deck
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

//Helper functions
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

//Game Logic
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

    setStartGameBtn(false)
    setdrawBtn(true)
  }

  const drawCards = () => {
    setdrawBtn(false)
    setPlayerWar([])
    setCpuWar([])

    let pDeck = playerDeck.slice()
    let cDeck = cpuDeck.slice()

    const drawnPlayerCard = pDeck[0]
    const drawnCpuCard = cDeck[0]

    setDrawnPlCard(drawnPlayerCard)
    setDrawnCpCard(drawnCpuCard)

    if (parseInt(drawnPlayerCard.value) > parseInt(drawnCpuCard.value)) {
      setTimeout(() => {
        setPlayerDeck(playerDeck => playerDeck.slice(1).concat([drawnPlayerCard, drawnCpuCard]))
        setCpuDeck(cpuDeck => cpuDeck.slice(1))
        setdrawBtn(true)
      }, 2000);  
    }

    else if (parseInt(drawnPlayerCard.value) < parseInt(drawnCpuCard.value)) {
      setTimeout(() => {
        setCpuDeck(cpuDeck.slice(1).concat([drawnPlayerCard, drawnCpuCard]))
        setPlayerDeck(playerDeck.slice(1))
        setdrawBtn(true)
      }, 2000);  
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

    setPlayerWar(pWar)
    setCpuWar(pWar)
    
    if (parseInt(pWar[pWar.length-1].value) > parseInt(cWar[cWar.length-1].value)) {
      setPlayerDeck(pDeck.slice(3, pDeck.length).concat([drawnPlCard, drawnCpCard, ...pWar, ...cWar, ...cWarDeck, ...pWarDeck]))
      setCpuDeck(cDeck.slice(3, cDeck.length))
    }

    else if (parseInt(pWar[pWar.length-1].value) < parseInt(cWar[cWar.length-1].value)) {
      setCpuDeck(cDeck.slice(3, cDeck.length).concat([drawnPlCard, drawnCpCard, ...pWar, ...cWar, ...pWarDeck, ...cWarDeck]))
      setPlayerDeck(pDeck.slice(3, pDeck.length))
    }

    else if (parseInt(pWar[pWar.length-1].value) === parseInt(cWar[cWar.length-1].value)) {
      pDeck = 
      setCpuDeck(cDeck.slice(3, cDeck.length))
      setPlayerDeck(pDeck.slice(3, pDeck.length))
      setCpuWar([...cpuWar, ...cWar])
      setPlayerWar([...pWar, ...cWar])
      war(pDeck, cDeck)
    } 
  }

  return (
    <div>
      <h1 className="title">WAR</h1>
      <div className="flex-deck">
        <div className="players-deck">
          <h2 className="title">Player's Deck: {playerDeck.length}</h2>
          <img className="back-card" alt="back of card" height='314' width='266' src={require(`./card-back-red.png`).default}></img>
          {!isEmpty(drawnPlCard) && (
            <img alt="player's drawn card" src={drawnPlCard.image}></img>
          )}      
        </div>
        <div>
          {startGameBtn && (
            <button className="game-btn" onClick={() => startGame()}>Start Game</button>
          )}
          {drawBtn && (
          <button className="game-btn"  onClick={() => drawCards()}>Draw Cards</button>
          )}
        </div>
        <div className="cpus-deck">
        <h2 className="title" >Computer's Deck : {cpuDeck.length}</h2>
          <img className="back-card" alt="back of card" height='314' width='266' src={require(`./card-back-red.png`).default}></img>
          {!isEmpty(drawnCpCard) && (
            <img alt="computer's drawn card" src={drawnCpCard.image}></img>
          )}       
        </div>
      </div>
      <div className="flex-deck">
          {playerWar.length && (
            <div className="pwar-deck"> 
              <img className="back-card" alt="back of card" height='314' width='266' src={require(`./card-back-red.png`).default}></img>
              <img alt="player's drawn card" src={playerWar.image}></img>
            </div>
          )}
      
        
        <div className="cwar-deck">
        <h2 className="title" >Computer's Deck : {cpuDeck.length}</h2>
          <img className="back-card" alt="back of card" height='314' width='266' src={require(`./card-back-red.png`).default}></img>
          {!isEmpty(drawnCpCard) && (
            <img alt="computer's drawn card" src={drawnCpCard.image}></img>
          )}       
        </div>
      </div>
      
    </div>
  );
}

export default App;
