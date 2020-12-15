let CategoryModel = require("../models/CategoryModel");

module.exports = router => {
  router.post("/saveCategory", async (req, res, next) => {
    try {
      res.status(200).json(await CategoryModel.saveCategory(req.body));
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.get("/getOneCategory/:categoryId", async (req, res, next) => {
    try {
      let oneCategoryDetail = await CategoryModel.getOneCategory(req.params);
      if (oneCategoryDetail == "No Category Found") {
        res.status(204).json({ error: "No Category Found" });
      } else if (oneCategoryDetail && oneCategoryDetail._id) {
        res.status(200).json(oneCategoryDetail);
      } else {
        res.status(500).json({ error: "Internal Server Error!" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });

  router.post("/getAllCategory", async (req, res, next) => {
    try {
      let getAllCategories = await CategoryModel.getAllCategory(req.body);
      if (getAllCategories == "No Category Found") {
        res.status(204).json({ error: "No Category Found" });
      } else if (
        getAllCategories &&
        getAllCategories.results &&
        getAllCategories.results.length > 0
      ) {
        res.status(200).json(getAllCategories);
      } else {
        res.status(500).json({ error: "Internal Server Error!" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });

  router.post("/deleteCategory", async (req, res, next) => {
    try {
      let deleteCategory = await CategoryModel.deleteCategory(req.body);
      if (deleteCategory == "No Category Found") {
        res.status(204).json({ error: "No Category Found" });
      } else if (deleteCategory && deleteCategory.nModified) {
        res.status(200).json("Record Deleted SuccessFully");
      } else {
        res.status(500).json({ error: "No Record Found For Delete" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });
  router.post("/editCategory", async (req, res, next) => {
    try {
      let editCategory = await CategoryModel.editCategory(req.body);
      if (editCategory == "No Category Found") {
        res.status(204).json({ error: "No Category Found" });
      } else if (editCategory && editCategory.nModified) {
        res.status(200).json("Record edited SuccessFully");
      } else {
        res.status(500).json({ error: "No Record Found For edit" });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error!" });
    }
  });
};
