const cartTotalPrice = (array) => {
  let result = 0;
  array &&
    array.forEach((item, index) => {
      result += item.quantity * item.book.price;
    });
  return result;
};

export default cartTotalPrice;
