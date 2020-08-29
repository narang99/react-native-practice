import Order from "../../models/order";
import Product from "../../models/product";
import CartItem from "../../models/cartItem";

export const getFirestoreProduct = (product, isPriceEditable = false) => {
  const { title, imageUrl, description, ownerId, price } = product;
  return isPriceEditable
    ? {
        title,
        imageUrl,
        description,
        ownerId,
        price,
      }
    : {
        title,
        imageUrl,
        description,
        ownerId,
      };
};

export const getFirestoreCartItem = (cartItem) => {
  const { product, productTitle, price, sum, quantity, productId } = cartItem;
  return {
    product: getFirestoreProduct(product),
    productTitle,
    price,
    sum,
    quantity,
    productId,
  };
};

export const getFirestoreOrder = (order) => {
  const { ownerId, cartItems, amount, date } = order;
  const ci = cartItems.map((cartItem) => getFirestoreCartItem(cartItem));
  return {
    ownerId,
    amount,
    date,
    cartItems: ci,
  };
};

export const getProductFromDocData = (id, data) => {
  const { title, ownerId, imageUrl, description, price } = data;
  return new Product(id, ownerId, title, imageUrl, description, price);
};

export const getCartItemFromDocData = (data) => {
  const { product, productTitle, price, sum, quantity, productId } = data;
  return new CartItem(
    getProductFromDocData(productId, product),
    productTitle,
    price,
    sum,
    quantity,
    productId
  );
};

export const getOrderFromDocData = (id, data) => {
  const { amount, ownerId, date, cartItems } = data;
  const cItems = cartItems.map((ci) => getCartItemFromDocData(ci));
  return new Order(id, ownerId, cItems, amount, date);
};
