import { db } from "../../backend/firebase/firebase";
import Order from "../../models/order";
import {
  getFirestoreOrder,
  getOrderFromDocData,
} from "../../backend/firebase/converters";
import { getCurrentUserId } from "../../backend/firebase/helpers";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDERS = "SET_ORDERS";

export const addOrder = (cartItems, amount) => {
  return async (dispatch) => {
    const date = new Date();
    const o = new Order(null, getCurrentUserId(), cartItems, amount, date);
    try {
      const docRef = await db.collection("orders").add(getFirestoreOrder(o));
      o.id = docRef.id;
      dispatch({ type: ADD_ORDER, order: o });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchOrders = (onSuccess = () => {}, onError = () => {}) => (
  dispatch
) => {
  return db
    .collection("orders")
    .where("ownerId", "==", getCurrentUserId())
    .onSnapshot(
      (querySnapshot) => {
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push(getOrderFromDocData(doc.id, doc.data()));
        });
        dispatch({ type: SET_ORDERS, orders });
        onSuccess(orders);
      },
      (error) => {
        onError(error);
      }
    );
};
