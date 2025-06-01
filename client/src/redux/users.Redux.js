import { API_URL } from "../config";

// SELECTORS
export const getLoggedUser = state => state.user;

// ACTION NAME CREATOR
const createActionname = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionname('LOG_IN');
const LOG_OUT = createActionname('LOG_OUT');

// ACTIONS 
export const logIn = payload => ({
  type: LOG_IN,
  payload
});

export const logOut = () => ({
  type: LOG_OUT,
})

//THUNKS
export const checkUser = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${API_URL}/auth/user`);
      if (res.status === 200) {
        const data = await res.json();
        dispatch(logIn(data.loggedUser));
      }
    } catch (err) {
      console.error('checkUser error:', err.message);
    }
  };
};

// INITIAL STATE

// REDUCER
const usersReducer = (statePart = null, action) =>{
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return statePart;
  }
};

export default usersReducer;