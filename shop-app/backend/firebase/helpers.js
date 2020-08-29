import { firebase } from "./firebase";
export const getCurrentUserId = () => {
  console.log("huhuhuhu", firebase.auth());
  return firebase.auth().currentUser.uid;
};