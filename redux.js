// REDUX CYCLE

// store
import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    applyMiddleware(thunk)
  )
);


// action
import APIRequest from './api_file';

export const RECEIVE_ALL_ITEM = "RECEIVE_ALL_ITEM";
export const RECEIVE_ITEM = "RECEIVE_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";

const fetchItem = () => dispatch => (
  APIRequest().then( data => (
    dispatch(actionName(data))
  ))
);

const actionName = (data) => ({
  type: RECEIVE_ALL_ITEM,
  data
});


// reducer
import merge from 'lodash/merge';

const reducerName = (state = {}, action) => {
  Object.freeze(state);
  let newState;

  switch(action.type){
    case RECEIVE_ALL_ITEM:
      newState = merge({}, action.data);
      return newState;
    case RECEIVE_ITEM:
      let newData = {[action.data.id]: action.data};
      newState = merge({}, state, newData);
      return newState;
    case REMOVE_ITEM:
      newState = merge({}, state);
      delete newState[action.data.id];
      return newState;
    default:
      return state;
  }
};
