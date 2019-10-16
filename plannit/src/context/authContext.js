import createDataContext from "./createDataContext";
import planitApi from '../api/planitApi'

const authReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const signup = dispatch => {
  return async ({ email, password }) => {
    try {
      const response = await planitApi.post('/signup',{email, password})
    } catch (err) {
      
    }
  };
};

const signin = dispatch => {
  return ({ email, password }) => {};
};

const signout = dispatch => {
  return () => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signup, signin, signout },
  { isSignedIn: false }
);
