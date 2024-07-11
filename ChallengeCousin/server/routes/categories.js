const express = require("express")
const router = express.Router()
const Categories = require('../controllers/categories');
const authorization = require('../middlewares/authorization');


router.get("/", Categories.getCategories)

router.post("/", Categories.createCategory)

router.get("/:id", Categories.getCategoryById)

router.delete("/:id", authorization, Categories.deleteCategory)

router.put("/:id", Categories.editCategory)

module.exports = router
