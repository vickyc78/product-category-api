let CategorySchema = require("../mongooseModel/Category");
let mongoose = require("mongoose");
let Category = mongoose.model("Category", CategorySchema);
let _ = require("lodash");

module.exports = {
  async saveCategory(data) {
    let CategoryData = new Category(data);
    let newCategory = await CategoryData.save();
    return newCategory;
  },
  async getOneCategory(data) {
    try {
      let CategoryDetail = await Category.findOne({
        _id: data.categoryId
      });
      if (_.isEmpty(CategoryDetail)) {
        return "No Category Found";
      } else {
        return CategoryDetail;
      }
    } catch (error) {
      throw error;
    }
  },
  async getAllCategory(data) {
    try {
      let limit = 10,
        obj = {},
        page = data.page ? data.page : 1,
        filter = {},
        skip = (page - 1) * limit;
      if (data.name && data.name == "product") {
        filter.status = "Enable";
      }
      obj.results = await Category.find(filter)
        .sort({
          _id: -1
        })
        .limit(limit)
        .skip(skip);
      obj.total = await Category.find(filter).countDocuments();
      obj.page = page;
      if (_.isEmpty(obj.results)) {
        return "No Category Found";
      } else {
        return obj;
      }
    } catch (error) {
      throw error;
    }
  },
  async deleteCategory(data) {
    try {
      console.log("HHHHHHHHHHHHHHHh");
      let deleteCategoryRecord = await Category.updateOne(
        {
          _id: mongoose.Types.ObjectId(data.categoryId),
          status: "Enable"
        },
        {
          $set: {
            status: "Disable"
          }
        },
        { new: true }
      );
      console.log("productDetail productDetail", deleteCategoryRecord);
      if (_.isEmpty(deleteCategoryRecord)) {
        return "No Category Found";
      } else {
        return deleteCategoryRecord;
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },
  async editCategory(data) {
    try {
      console.log("HHHHHHHHHHHHHHHh");
      let editCategoryRecord = await Category.updateOne(
        {
          _id: mongoose.Types.ObjectId(data.categoryId)
        },

        data,
        { new: true }
      );
      console.log("productDetail productDetail", editCategoryRecord);
      if (_.isEmpty(editCategoryRecord)) {
        return "No Category Found";
      } else {
        return editCategoryRecord;
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }
};
