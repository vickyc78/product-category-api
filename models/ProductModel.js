let ProductSchema = require("../mongooseModel/Product");
let mongoose = require("mongoose");
let Product = mongoose.model("Product", ProductSchema);
let CategorySchema = require("../mongooseModel/Category");
let Category = mongoose.model("Category", CategorySchema);
let _ = require("lodash");

module.exports = {
  async saveProduct(data) {
    try {
      if (!data.categoryId) {
        throw { message: "Category is required" };
      } else {
        let getOneCategory = await Category.findOne({
          _id: mongoose.Types.ObjectId(data.categoryId),
          status: "Enable"
        });
        console.log("getOneCategory", getOneCategory);
        if (_.isEmpty(getOneCategory)) {
          return "No Category Found";
        } else {
          let ProductData = new Product(data);
          let newProduct = await ProductData.save();
          return newProduct;
        }
      }
    } catch (err) {
      console.log("errrrrrr", err);
      throw err;
    }
  },
  async getOneProduct(data) {
    try {
      let ProductDetail = await Product.findOne({
        _id: data.productId
      }).populate("categoryId");
      if (_.isEmpty(ProductDetail)) {
        return "No Product Found";
      } else {
        return ProductDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async getAllProduct(data) {
    try {
      let limit = 10,
        obj = {},
        page = data.page ? data.page : 1,
        filter = {},
        skip = (page - 1) * limit;

      obj.results = await Product.find(filter)
        .populate("categoryId")
        .sort({
          _id: -1
        })
        .limit(limit)
        .skip(skip);
      obj.total = await Product.find(filter).countDocuments();
      obj.page = page;
      if (_.isEmpty(obj.results)) {
        return "No Product Found";
      } else {
        return obj;
      }
    } catch (error) {
      throw error;
    }
  },
  async deleteProduct(data) {
    try {
      console.log("HHHHHHHHHHHHHHHh");
      let productDetail = await Product.updateOne(
        {
          _id: mongoose.Types.ObjectId(data.productId),
          status: "Enable"
        },
        {
          $set: {
            status: "Disable"
          }
        },
        { new: true }
      );
      console.log("productDetail productDetail", productDetail);
      if (_.isEmpty(productDetail)) {
        throw { err: "No Product Found" };
      } else {
        return productDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async editProduct(data) {
    try {
      console.log("HHHHHHHHHHHHHHHh");
      let editProductDetail = await Product.updateOne(
        {
          _id: mongoose.Types.ObjectId(data.productId)
        },

        data,
        { new: true }
      );
      console.log("productDetail productDetail", editProductDetail);
      if (_.isEmpty(editProductDetail)) {
        throw { err: "No Product Found" };
      } else {
        return editProductDetail;
      }
    } catch (error) {
      throw error;
    }
  }
};
