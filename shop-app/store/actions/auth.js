import { firebase } from "../../backend/firebase/firebase";
export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";

export const signup = (email, password) => async (dispatch) => {
  try {
    const result = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    dispatch({ type: SIGNUP, token: result.user.getIdToken(), userId: result.user.uid, authResult: result });
    return result;
  } catch (err) {
    console.log("in signup caught throwing");
    throw err;
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    dispatch({ type: LOGIN, token: result.user.getIdToken(), userId: result.user.uid, authResult: result });
    return result;
  } catch (err) {
    console.log("in login caught throwing");
    throw err;
  }
};
