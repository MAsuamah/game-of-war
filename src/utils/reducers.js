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

    

    default:
      return state;
  }
}

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState);
} 