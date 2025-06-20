import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import adsReducer from "./adsRedux";
import usersReducer from "./users.Redux";
import { thunk } from "redux-thunk";

const subreducers = {
  ads: adsReducer,
  user: usersReducer
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  //initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;