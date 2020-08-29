import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../../settings";


firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(res => console.log("ppersistanve result", res))
  .catch(err => console.log("persistance error", err));

export const db = firebase.firestore();
export { firebase };