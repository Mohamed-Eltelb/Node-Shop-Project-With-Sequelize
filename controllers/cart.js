const Product = require("../models/product");
const Cart = require("../models/cart");
const { Op } = require("sequelize");

exports.getCart = (req, res, next) => {
  Cart.findAll({ where: { userId: req.user.id } })
    .then((cartItems) => {
      if (cartItems.length > 0) {
        const productIds = cartItems.map((item) => item.product_id);
        return Product.findAll({
          where: {
            id: {
              [Op.in]: productIds,
            },
          },
        }).then((products) => {
          if (!products || products.length === 0) return [];
          return cartItems.map((item) => {
            const product = products.find(
              (prod) => prod.id === item.product_id
            );
            return {
              ...product.dataValues,
              quantity: item.quantity,
            };
          });
        });
      } else return [];
    })
    .then((cartItems) => {
        console.log(cartItems);
        
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

  Cart.findOne({ where: { product_id: prodId, userId: req.user.id } })
    .then((cartItem) => {
      if (cartItem) {
        // Item exists in cart, update quantity
        cartItem.quantity += 1;
        return cartItem.save();
      } else {
        // Item doesn't exist in cart, add to cart
        return Cart.create({
          product_id: prodId,
          userId: req.user.id,
          quantity: 1,
        });
      }
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
};

exports.updateQuantityInCart = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  const newQuantity = parseInt(req.body.quantity, 10);
  Cart.findOne({ where: { product_id: prodId, userId: req.user.id } })
    .then((cartItem) => {
      if (cartItem) {
        cartItem.quantity = newQuantity;
        return cartItem.save();
      }
    })
    .then(() => {
      res.redirect("/cart");
    });
};

exports.postRemoveFromCart = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  Cart.destroy({ where: { product_id: prodId, userId: req.user.id } }).then(() => {
  res.redirect("/cart");});
};
