
import { createStore } from 'redux';
import reducer from './reducer';

const initialState = {
  winner: { last: "" },
};
export const initializeStore = (preloadedState = initialState) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return createStore(reducer, preloadedState, composeWithDevTools());
  }
  return createStore(reducer, preloadedState);
};
