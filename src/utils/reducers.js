import { useReducer } from "react"

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_START_BUTTON':
      return {
        ...state,
        startGameBtn: !state.startGameBtn
      };
    case 'SET_DRAW_BUTTON':
      return {
        ...state,
        drawBtn: !state.drawBtn
      };
    case 'SET_PLAYER_DECK':
      return {
        ...state,
        playerDeck: action.playerDeck
      };
    case 'SET_CPU_DECK':
      return {
        ...state,
        cpuDeck: action.cpuDeck
      };

    

    default:
      return state;
  }
}

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState);
} 