// SELECTORS
export const getLoggedUser = state => state.user;

// ACTIONS
const createActionname = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionname('LOG_IN');
const LOG_OUT = createActionname('LOG_OUT');

// ACTIONS CREATORS
export const logIn = payload => ({
  type: LOG_IN,
  payload
});

export const logOut = () => ({
  type: LOG_OUT,
})

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