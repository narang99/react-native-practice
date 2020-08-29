import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  CREATE_PRODUCT,
  SET_PRODUCTS,
} from "../actions/products";
import { getCurrentUserId } from "../../backend/firebase/helpers";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: [],
};

// eslint-disable-next-line no-unused-vars
export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (p) => p.id !== action.product.id
        ),
        userProducts: state.userProducts.filter(
          (p) => p.id !== action.product.id
        ),
      };
    case EDIT_PRODUCT: {
      return {
        ...state,
        availableProducts: state.availableProducts
          .filter((p) => p.id !== action.product.id)
          .concat(action.product),
        userProducts: state.userProducts
          .filter((p) => p.id !== action.product.id)
          .concat(action.product),
      };
    }

    case CREATE_PRODUCT: {
      return {
        // sometimes snapshot listener on firestore, adds the product before this action is performed
        // that is it sets the value to this
        // dont need to do anything with the snapshot listener, but to make sure it works with normal get
        // filter done
        ...state,
        availableProducts: state.availableProducts
          .filter((p) => p.id !== action.product.id)
          .concat(action.product),
        userProducts: state.userProducts
          .filter((p) => p.id !== action.product.id)
          .concat(action.product),
      };
    }

    case SET_PRODUCTS: {
      return {
        ...state,
        availableProducts: action.products,
        userProducts: action.products.filter((prod) => prod.ownerId === getCurrentUserId()),
      };
    }

    default:
      return state;
  }
};
