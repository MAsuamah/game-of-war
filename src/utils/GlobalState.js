import React, {createContext, useContext } from "react";
import { useGameReducer } from './reducers';

const GameContext = createContext()
const { Provider } = GameContext

const GameProvider = ({value=[], ...props}) => {
  const [state, dispatch] = useGameReducer({
    startGameBtn: true,
    drawBtn: false,
    playerDeck: [],
    cpuDeck: [],
    drawnPlCard: {},
    drawnCpCard: {},
    cpuWar: [],  
    playerWar: [], 
    playerWin: '',
    cpuWin: '',
    rules: true
  })

  console.log(state)

  return <Provider value={[state, dispatch]} {...props}/>
}

const useGameContext = () => {
  return useContext(GameContext)
};

export { GameProvider, useGameContext}


