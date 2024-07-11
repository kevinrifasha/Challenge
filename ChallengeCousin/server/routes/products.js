const express = require("express")
const router = express.Router()
const Controller = require('../controllers/items');
const authorization = require("../middlewares/authorization");

router.get("/", Controller.getItems)

router.post("/", Controller.createItem)

router.get("/:id", Controller.getItemById)

router.put("/:id", Controller.editItem)

router.delete("/:id", authorization, Controller.deleteItem)

module.exports = router
