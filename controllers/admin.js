const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    docTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  Product.create({
    title: title,
    imageUrl: imageUrl,
    description: description,
    price: price,
    userId: req.user.id,
  })
    .then(() => {
      res.redirect("/products");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res, next) => {
  const prodId = parseInt(req.params.productId, 10);
  Product.findByPk(prodId).then((product) => {
    res.render("admin/edit-product", {
      docTitle: "Edit Product",
      path: "/admin/edit-product",
      formsCSS: true,
      product: product,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = parseInt(req.params.productId, 10);
  Product.findByPk(prodId).then((product) => {
    if (!product) {
      return res.redirect("/admin/products");
    } else {
      product.title = req.body.title;
      product.imageUrl = req.body.imageUrl;
      product.description = req.body.description;
      product.price = req.body.price;
      return product.save();
    }
  }).then(() => {
    res.redirect("/admin/products");
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = parseInt(req.body.productId, 10);
  Product.destroy({ where: { id: prodId } }).then(() => {
    res.redirect("/admin/products");
  });
};

//admin products
exports.getAdminProducts = (req, res, next) => {
  Product.findAll({ where: { userId: req.user.id } }).then((products) => {
    res.render("admin/products", {
      prods: products,
      docTitle: "Admin Products",
      path: "/admin/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};