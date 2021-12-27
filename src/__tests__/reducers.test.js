import { reducer } from '../utils/reducers'

const initialState = {
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
};

test('SET_START_BUTTON', () => {
  let newState = reducer(initialState, {
    type: 'SET_START_BUTTON',
    startGameBtn: false
  });

  expect(initialState.startGameBtn).toBeTruthy();
  expect(newState.startGameBtn).toBeFalsy();

});