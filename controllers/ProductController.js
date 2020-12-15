let ProductModel = require("../models/ProductModel");

module.exports = router => {
  router.post("/saveProduct", async (req, res, next) => {
    try {
      let saveProductData = await ProductModel.saveProduct(req.body);
      if (saveProductData == "No Category Found") {
        res.status(204).json({ error: "No Category Found" });
      } else {
        res.status(200).json(saveProductData);
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });

  router.get("/getOneProduct/:productId", async (req, res, next) => {
    try {
      let oneProductDetail = await ProductModel.getOneProduct(req.params);
      if (oneProductDetail == "No Product Found") {
        res.status(204).json({ error: "No Product Found" });
      } else if (oneProductDetail && oneProductDetail._id) {
        res.status(200).json(oneProductDetail);
      } else {
        res.status(500).json({ error: "Internal Server Error!" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });

  router.post("/getAllProduct", async (req, res, next) => {
    try {
      let getAllProducts = await ProductModel.getAllProduct(req.body);
      if (getAllProducts == "No Product Found") {
        res.status(204).json({ error: "No Product Found" });
      } else if (
        getAllProducts &&
        getAllProducts.results &&
        getAllProducts.results.length > 0
      ) {
        res.status(200).json(getAllProducts);
      } else {
        res.status(500).json({ error: "Internal Server Error!" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });
  router.post("/deleteProduct", async (req, res, next) => {
    try {
      let deleteProduct = await ProductModel.deleteProduct(req.body);
      if (deleteProduct == "No Product Found") {
        res.status(204).json({ error: "No Product Found" });
      } else if (deleteProduct && deleteProduct.nModified) {
        res.status(200).json("Record Deleted SuccessFully");
      } else {
        res.status(500).json({ error: "No Record Found For Delete" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });
  router.post("/editProduct", async (req, res, next) => {
    try {
      let editProduct = await ProductModel.editProduct(req.body);
      if (editProduct == "No Product Found") {
        res.status(204).json({ error: "No Product Found" });
      } else if (editProduct && editProduct.nModified) {
        res.status(200).json("Record edited SuccessFully");
      } else {
        res.status(500).json({ error: "No Record Found For edit" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });
};
