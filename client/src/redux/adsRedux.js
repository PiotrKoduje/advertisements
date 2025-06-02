import { API_URL } from "../config";

// SELECTORS
export const getAds = state => state.ads.data;
export const getRequests = state => state.ads.requests;
export const getAd = (state, id) => state.ads.data.find(ad => ad.id === id);

// ACTION NAME CREATOR
const reducerName = 'ads';
const createActionName = name => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');
const CLEAR_REQUEST = createActionName('CLEAR_REQUEST');

const LOAD_ADS = createActionName('LOAD_ADS');
const ADD_AD = createActionName('ADD_AD');
const EDIT_AD = createActionName('EDIT_AD');
const DELETE_AD = createActionName('DELETE_AD');

// ACTIONS
export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });
export const clearRequest = payload => ({ payload, type: CLEAR_REQUEST });

export const loadAds = payload => ({ payload, type: LOAD_ADS });
export const addAd = payload => ({ payload, type: ADD_AD });
export const editAd = payload => ({ payload, type: EDIT_AD });
export const deleteAd = payload => ({ payload, type: DELETE_AD });

// THUNKS 
export const loadAdsRequest = () => {
  return async dispatch => {

    dispatch(startRequest({ name: 'LOAD_ADS'}));
    try {
      const res = await fetch(`${API_URL}/api/ads`, { credentials: 'include' });
      if (res.status === 200) {
        const ads = await res.json();
        dispatch(loadAds(ads));
        dispatch(endRequest({ name: 'LOAD_ADS'}));
      }
    } catch (e) {
      dispatch(errorRequest({ name: 'LOAD_ADS', error: e.message }));
    }
  };
};

export const adAddRequest = (fd) => {
  return async dispatch => {

    dispatch(startRequest({ name: 'ADD_AD'}));
    try {
      const res = await fetch(`${API_URL}/api/ads`, { method: 'POST', body: fd, credentials: 'include'});
      if (res.status === 201) {
        dispatch(endRequest({ name: 'ADD_AD' }));
        dispatch(addAd(res));
      } 
      else if (res.status === 400) {
        dispatch(errorRequest({ name: 'ADD_AD', error: 'incorrect data' }));
      } else if (res.status === 500) {
        dispatch(errorRequest({ name: 'ADD_AD', error: 'server error' }));
      }
    } catch (e) {
      dispatch(errorRequest({ name: 'ADD_AD', error: e.message }));
    }
  }
}

export const editAdRequest = (fd, id) => {
  return async dispatch => {

    dispatch(startRequest({ name: 'EDIT_AD' }));
    try{
      const res = await fetch(`${API_URL}/api/ads/${id}`, { method: 'PATCH', body: fd, credentials: 'include'});
      console.log('')
      if (res.status === 200) {
        dispatch(endRequest({ name: 'EDIT_AD' }));
        dispatch(editAd(res));
      }
      else if (res.status === 400) {
        dispatch(errorRequest({ name: 'EDIT_AD', error: 'incorrect data' }));
      } else if (res.status === 500) {
        dispatch(errorRequest({ name: 'EDIT_AD', error: 'server error' }));
      }
    } catch (e) { 
      dispatch(errorRequest({ name: 'EDIT_AD', error: e.message }));
    }
  }
};

export const deleteAdRequest = (id) => {
  console.log(id);
  return async dispatch => {

    dispatch(startRequest({ name: 'DELETE_AD'}));
    try{
      const res = await fetch(`${API_URL}/api/ads/${id}`, { method: 'DELETE', credentials: 'include'});
      if (res.status === 200){
        dispatch(endRequest({ name: 'DELETE_AD' }));
        dispatch(deleteAd(id));
      }
    } catch (e) {
      dispatch(errorRequest({ name: 'DELETE_AD', error: e.message }));
    }
  };
};

// INITIAL STATE 
const initialState = {
  data: [],
  requests: {
    LOAD_ADS: { error: null, pending: true, success: false }
  },
};

// REDUCER
const adsReducer = (statePart =initialState, action) => {
  switch (action.type) {
    case LOAD_ADS: 
      return { ...statePart, data: [...action.payload] };
    case ADD_AD: 
      return { ...statePart, data: [...statePart.data, action.payload] };
    case EDIT_AD:
      return { ...statePart, data: statePart.data.map(ad => ad.id === action.payload.id ? action.payload : ad)};
    case DELETE_AD:
      return { ...statePart, data: statePart.data.filter(ad => ad.id !== action.payload)};
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.error, success: false }} };
      case CLEAR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: false }} };
    default:
      return statePart;
  }
}

export default adsReducer;