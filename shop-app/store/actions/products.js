import { db } from "../../backend/firebase/firebase";
import {
  getFirestoreProduct,
  getProductFromDocData,
} from "../../backend/firebase/converters";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const deleteProduct = (product) => {
  return async (dispatch) => {
    try {
      const docRef = await db.collection("products").doc(product.id).delete();
      dispatch({ type: DELETE_PRODUCT, product });
      return docRef;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const editProduct = (product) => {
  return async (dispatch) => {
    try {
      // price not editable
      const docRef = await db
        .doc(`products/${product.id}`)
        .update(getFirestoreProduct(product, false));

      dispatch({ type: EDIT_PRODUCT, product });
      return docRef;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };
};

export const createProduct = (product) => {
  return async (dispatch) => {
    try {
      // edit price
      const docRef = await db.collection("products").add(getFirestoreProduct(product, true));
      product.id = docRef.id;
    } catch (err) {
      console.log(err.message);
      throw err;
    }
    dispatch({ type: CREATE_PRODUCT, product });
  };
};

// working
export const fetchProducts = (onSuccess = () => {}, onError = () => {}) => (
  dispatch
) => {
  return db.collection("products").onSnapshot(
    (querySnapshot) => {
      const products = [];
      querySnapshot.forEach((doc) => products.push(getProductFromDocData(doc.id, doc.data())));
      dispatch({ type: SET_PRODUCTS, products });
      onSuccess(products);
    },
    (error) => {
      onError(error);
    }
  );
};
