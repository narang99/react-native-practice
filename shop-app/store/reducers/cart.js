import { ADD_TO_CART, DELETE_FROM_CART, CLEAR_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";
import { DELETE_PRODUCT, EDIT_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  amount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.product;
      let toAdd;
      if (state.items[product.id] === undefined) {
        toAdd = new CartItem(
          product,
          product.title,
          product.price,
          product.price,
          1,
          product.id
        );
      } else {
        const old = state.items[product.id];
        toAdd = new CartItem(
          product,
          product.title,
          product.price,
          old.sum + product.price,
          old.quantity + 1,
          product.id
        );
      }
      return {
        ...state,
        items: { ...state.items, [product.id]: toAdd },
        amount: state.amount + product.price,
      };
    }
    case DELETE_FROM_CART: {
      const cartItem = action.cartItem;
      const nItems = { ...state.items };
      let nAmount = state.amount;
      const old = nItems[cartItem.productId];
      if (old !== undefined) {
        nAmount -= old.sum;
        delete nItems[cartItem.productId];
      }
      return {
        ...state,
        items: nItems,
        amount: nAmount,
      };
    }
    case CLEAR_CART:
      return initialState;
    case DELETE_PRODUCT: {
      const toDelete = state.items[action.product.id];
      if (toDelete === undefined || toDelete === null) {
        return state;
      } else {
        const nItems = { ...state.items };
        delete nItems[action.product.id];
        const amount = state.amount - toDelete.sum;
        return {
          ...state,
          items: nItems,
          amount,
        };
      }
    }
    case EDIT_PRODUCT: {
      const { product } = action;
      const nItems = {...state.items};
      if(state.items[product.id] !== undefined && state.items[product.id] !== null) {
        delete nItems[product.id];
        nItems[product.id] = new CartItem(product, product.title, product.price, product.sum, product.quantity, product.id);
      }
      return {
        ...state,
        items: nItems,
      };
    }
    default:
      return state;
  }
};
