export default class CartItem {
  constructor(product, productTitle, price, sum, quantity, productId)  {
    this.product = product;
    this.productTitle = productTitle;
    this.price = price;
    this.sum = sum;
    this.quantity = quantity;
    this.productId = productId;
  }
}