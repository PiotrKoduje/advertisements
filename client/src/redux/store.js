import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import initialState from "./initialState";
import adsReducer from "./adsRedux";
import { thunk } from "redux-thunk";

const subreducers = {
  ads: adsReducer
};

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;