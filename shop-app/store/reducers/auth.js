import { LOGIN, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, token: action.token, userId: action.userId, user: action.authResult };
    case SIGNUP:
      return { ...state, token: action.token, userId: action.userId, user: action.authResult };
    default: 
      return state;
  }
};
