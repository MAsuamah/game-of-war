 import { useReducer } from "react"

const reducer = (state, action) => {
  switch(action.type) {
    case 'SET_START_BUTTON':
      return {
        ...state,
        startGameBtn: !state.startGameBtn
      };

    

    default:
      return state;
  }
}

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState);
} 