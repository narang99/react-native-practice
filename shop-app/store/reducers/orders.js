import { ADD_ORDER, SET_ORDERS } from "../actions/orders";
const initialState = {
  orders: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const orders = state.orders
        .filter((o) => o.id !== action.order.id)
        .concat(action.order);
      return {
        ...state,
        orders,
      };
    }
    case SET_ORDERS: {
      return {
        ...state,
        orders: action.orders,
      };
    }
    default:
      return state;
  }
};
