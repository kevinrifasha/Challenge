const express = require("express")
const router = express.Router()
const Categories = require('../controllers/categories')
const Items = require('../controllers/items');

router.get("/", (req, res) => {
    res.send("Public routes")
})

router.get("/categories", Categories.getCategories)

router.get("/products", Items.getItems)

router.get("/products/:id", Items.getItemById)


module.exports = router