import React, { useReducer } from 'react';

import { Context } from './contexts/UserContext';
import { INITIAL_STATE, reducer } from './contexts/UserContext/reducer';
import AppRouter from './routers/AppRouter';

function App() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <AppRouter />
    </Context.Provider>
  );
}

export default App;
