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
    case 'SET_DRAWN_PL_CARD':
      return {
        ...state,
        drawnPlCard: action.drawnPlCard
      };
    case 'SET_DRAWN_CP_CARD':
        return {
        ...state,
        drawnCpCard: action.drawnCpCard
      };
    case 'SET_C_WAR':
      return {
      ...state,
      cpuWar: action.cpuWar
    };
    case 'SET_P_WAR':
      return {
      ...state,
      playerWar: action.playerWar
    };
    case 'SET_P_WIN':
      return {
      ...state,
      playerWin: action.playerWin
    };
    case 'SET_C_WIN':
      return {
      ...state,
      cpuWin: action.cpuWin
    }
    case 'SET_RULES':
      return {
      ...state,
      rules: false
    }
    default:
      return state;
  }
}

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState);
} 