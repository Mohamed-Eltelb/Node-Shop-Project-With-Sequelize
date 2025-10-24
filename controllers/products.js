const Product = require("../models/product");
const Cart = require("../models/cart");

/* ============= Products ============= */
exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    res.render("shop/product-list", {
      prods: products,
      docTitle: "Shop",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = parseInt(req.params.productId, 10);
  Product.findByPk(prodId).then((product) => {
    if (product) {
      res.render("shop/product-detail", {
        product: product,
        docTitle: product.title,
        path: "/product-detail",
      });
    } else {
      res.redirect("/");
    }
  });
};

/* ============= General ============= */
exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    docTitle: "Shop",
    path: "/",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    docTitle: "Checkout",
    path: "/checkout",
  });
};
