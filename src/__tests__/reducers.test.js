import { reducer } from '../utils/reducers'

const initialState = {
  startGameBtn: true,
  drawBtn: false,
  playerDeck: [],
  cpuDeck: [],
  drawnPlCard: {},
  drawnCpCard: {},
  cpuWar: [ 3, 4 ],  
  playerWar: [ 3, 4 ], 
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

test('SET_DRAW_BUTTON', () => {
  let newState = reducer(initialState, {
    type: 'SET_DRAW_BUTTON',
    drawBtn: true
  });

  expect(initialState.drawBtn).toBeFalsy();
  expect(newState.drawBtn).toBeTruthy();
});

test('SET_RULES', () => {
  let newState = reducer(initialState, {
    type: 'SET_RULES',
    rules: false
  });

  expect(initialState.rules).toBeTruthy();
  expect(newState.rules).toBeFalsy();
});

test('SET_P_WIN', () => {
  let newState = reducer(initialState, {
    type: 'SET_P_WIN',
    playerWin: 'You Win'
  });

  expect(initialState.playerWin).toBe('')
  expect(newState.playerWin).toBe('You Win');
});

test('SET_C_WIN', () => {
  let newState = reducer(initialState, {
    type: 'SET_C_WIN',
    cpuWin: 'You Lose'
  });

  expect(initialState.cpuWin).toBe('')
  expect(newState.cpuWin).toBe('You Lose');
});

test('SET_PLAYER_DECK', () => {
  let pDeck = [6, 7, 8, 9]

  let newState = reducer(initialState, {
    type: 'SET_PLAYER_DECK',
    playerDeck: pDeck.slice(1)
  });

  expect(initialState.playerDeck.length).toBe(0)
  expect(newState.playerDeck.length).toBe(3);
});

test('SET_CPU_DECK', () => {
  let cDeck =  [6, 7, 8, 9]
  let pCard = [1]

  let newState = reducer(initialState, {
    type: 'SET_CPU_DECK',
    cpuDeck: cDeck.concat(pCard)
  });

  expect(initialState.cpuDeck.length).toBe(0)
  expect(newState.cpuDeck.length).toBe(5);
});

test('SET_DRAWN_PL_CARD', () => {
  let pDeck = [
    {
      "image": "https://deckofcardsapi.com/static/img/8C.png",
      "value": "8",
      "suit": "CLUBS",
      "code": "8C"
    },
    {
      "image": "https://deckofcardsapi.com/static/img/KH.png",
      "value": "KING",
      "suit": "HEARTS",
      "code": "KH"
    }
  ]

  let drawnCard = pDeck[0]
  
  let newState = reducer(initialState, {
    type: 'SET_DRAWN_PL_CARD',
    drawnPlCard: drawnCard
  });

  expect(initialState.drawnPlCard).toMatchObject({})
  expect(newState.drawnPlCard.value).toBe("8");
});

test('SET_DRAWN_CP_CARD', () => {
  let cDeck = [
    {
      "image": "https://deckofcardsapi.com/static/img/8C.png",
      "value": "8",
      "suit": "CLUBS",
      "code": "8C"
    },
    {
      "image": "https://deckofcardsapi.com/static/img/KH.png",
      "value": "KING",
      "suit": "HEARTS",
      "code": "KH"
    }
  ]

  let drawnCard = cDeck[0]
  
  let newState = reducer(initialState, {
    type: 'SET_DRAWN_CP_CARD',
    drawnCpCard: drawnCard
  });

  expect(initialState.drawnCpCard).toMatchObject({})
  expect(newState.drawnCpCard.value).toBe("8");
});

test('SET_C_WAR', () => {

  let newState = reducer(initialState, {
    type: 'SET_C_WAR',
    cpuWar: []
  });

  expect(initialState.cpuWar.length).toBe(2)
  expect(newState.cpuWar.length).toBe(0);
});

test('SET_P_WAR', () => {
  let newCWar = [6, 7]
  let newPWar = [6, 7]

  let newState = reducer(initialState, {
    type: 'SET_P_WAR',
    playerWar: initialState.playerWar.concat(newCWar, newPWar)
  });

  expect(initialState.playerWar.length).toBe(2)
  expect(newState.playerWar.length).toBe(6);
});

