const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getCart = (req, res, next) => {
  Product.fetchAllCart().then((cartItems) => {
    res.render("shop/cart", {
      docTitle: "Your Cart",
      path: "/cart",
      hasProducts: cartItems.length > 0,
      cartItems: cartItems,
      totalPrice: cartItems
        .reduce(
          (total, item) => total + parseFloat(item.price) * item.quantity,
          0
        )
        .toFixed(2),
    });
  });
};

exports.postAddToCart = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  Cart.create({ product_id: prodId }).then(() => {
    res.redirect("/cart");
  });
};

exports.updateQuantityInCart = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  const newQuantity = parseInt(req.body.quantity, 10);
  Product.updateQuantity(prodId, newQuantity);
  res.redirect("/cart");
};

exports.postRemoveFromCart = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  Product.removeFromCart(prodId);
  res.redirect("/cart");
};