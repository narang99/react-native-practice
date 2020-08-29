import moment from "moment";

export default class Order {
  constructor(id, ownerId, cartItems, amount, date)  {
    this.id = id;
    this.ownerId = ownerId;
    this.cartItems = cartItems;
    this.amount = amount;
    this.date = date;
  }

  get readableDate()  {
    return moment(this.date).format("MMMM Do YYYY, hh:mm");
  }
}