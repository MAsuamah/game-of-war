import React, { useState } from 'react';
import './App.css';

function App() {
  const [startGameBtn, setStartGameBtn] = useState(true)
  const [drawBtn, setdrawBtn] = useState(false)

  const [cpuDeck, setCpuDeck] = useState([])
  const [playerDeck, setPlayerDeck] = useState([])

  const [drawnPlCard, setDrawnPlCard] = useState({})
  const [drawnCpCard, setDrawnCpCard] = useState({})

  const [cpuWar, setCpuWar] = useState([])
  const [playerWar, setPlayerWar] = useState([])

  const [rules, setRules] = useState(true)

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
    setRules(false)

    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(function(response) {
      return response.json()
    })
    .then(function(response){
      const deckId = response.deck_id

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
        setPlayerDeck(pDeck.slice(1).concat([drawnPlayerCard, drawnCpuCard]))
        setCpuDeck(cDeck.slice(1))
        setdrawBtn(true)
      }, 2000);  
    }

    else if (parseInt(drawnPlayerCard.value) < parseInt(drawnCpuCard.value)) {
      setTimeout(() => {
        setCpuDeck(cDeck.slice(1).concat([drawnPlayerCard, drawnCpuCard]))
        setPlayerDeck(pDeck.slice(1))
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

    const pWar = pDeck.slice(1).slice(0, 2)
    const cWar = cDeck.slice(1).slice(0, 2)

    setPlayerWar(pWar)
    setCpuWar(cWar)
    
    if (parseInt(pWar[pWar.length-1].value) > parseInt(cWar[cWar.length-1].value)) {
      setTimeout(() => {
        setPlayerDeck(
          pDeck.slice(3, playerDeck.length)
          .concat([drawnPlCard, drawnCpCard, ...pWar, ...cWar, ...cWarDeck, ...pWarDeck])
        )
        setCpuDeck(cDeck.slice(3, cpuDeck.length))
        setdrawBtn(true)
      }, 2000);  
    }

    else if (parseInt(pWar[pWar.length-1].value) < parseInt(cWar[cWar.length-1].value)) {
      setTimeout(() => {
        setCpuDeck(
          cDeck.slice(3, cDeck.length)
          .concat([drawnCpCard, drawnPlCard, ...pWar, ...cWar, ...pWarDeck, ...cWarDeck])
        )
        setPlayerDeck(pDeck.slice(3, pDeck.length))
        setdrawBtn(true)
      }, 2000);
    }

    else if (parseInt(pWar[pWar.length-1].value) === parseInt(cWar[cWar.length-1].value)) {
      const pNewDeck = pDeck.slice(3, pDeck.length)
      const cNewDeck = cDeck.slice(3, cDeck.length)
      setCpuDeck(cNewDeck)
      setPlayerDeck(pNewDeck)
      setCpuWar([...cpuWar, ...cWar])
      setPlayerWar([...pWar, ...cWar])
      war(pNewDeck, cNewDeck)
      setdrawBtn(true)

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
        {playerWar.length > 0 && (
          <div className="pwar-deck"> 
            <img className="back-card" alt="back of card" height='314' width='266' src={require(`./card-back-red.png`).default}></img>
            <img alt="player's drawn card" src={playerWar[playerWar.length-1].image}></img>
          </div>
        )}  
        {playerWar.length > 0 && (
          <div className="cwar-deck">
            <img className="back-card" alt="back of card" height='314' width='266' src={require(`./card-back-red.png`).default}></img>
            <img alt="computer's drawn card" src={cpuWar[cpuWar.length-1].image}></img>
          </div>
        )}
        {rules && (
          <div className="rules">
            <p>
              The goal is to be the first player to win all 52 cards 
            </p>
            <p>
              <strong>THE DEAL</strong><br/>
              The deck is divided evenly, with each player receiving 26 cards, dealt one at a time, face down. Anyone may deal first. Each player places their stack of cards face down, in front of them. <br/>
            </p>
            <p>
              <strong>THE PLAY </strong><br/>
              Each player turns up a card at the same time and the player with the higher card takes both cards and puts them, face down, on the bottom of his stack.
              If the cards are the same rank, it is War. Each player turns up one card face down and one card face up. The player with the higher cards takes both piles (six cards). If the turned-up cards are again the same rank, each player places another card face down and turns another card face up. The player with the higher card takes all 10 cards, and so on. <br/>
            </p>
            <p>
              <strong>HOW TO KEEP SCORE</strong><br/>
              The game ends when one player has won all the cards.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
