const {Item, sequelize, Ingredient, User, Category} = require('../models');

class Controller {
    static async createItem(req, res, next) {
        const t = await sequelize.transaction()

        try {
            let {item, ingredients} = req.body
            const {id} = req.user

            const newItem = await Item.create({
                name: item.name,
                description: item.description,
                price: item.price,
                imgUrl: item.imgUrl,
                categoryId: item.categoryId,
                authorId: id
            }, {
                transaction: t 
            })

            // console.log(ingredients)
            if (!ingredients) {
                await t.commit()
                res.status(201).json({item: newItem})
                return
            }

            // console.log(newItem)
            ingredients = ingredients.map((el) => {
                return {
                    name: el.name,
                    itemId: newItem.id
                }
            })

            const newIngredients = await Ingredient.bulkCreate(ingredients, {
                transaction: t 
            })

            await t.commit()

            res.status(201).json({
                item: newItem,
                ingredients: newIngredients
            })

        } catch (error) {
            next(error)
            await t.rollback()
        }
    }

    static async getItems(req, res, next) {
        try {
            const {categoryId} = req.query
            let option = {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        model: User,
                        attributes: ["email"]
                    },
                    {
                        model: Category,
                        attributes: ["name"]
                    },
                    {
                        model: Ingredient,
                        attributes: ["name"]
                    }
                    ]
            }

            if (categoryId) {
                option.where = {
                    categoryId: categoryId
                }
            }

            const items = await Item.findAll(option)

            res.status(200).json(items)
        } catch (error) {
            next(error)
        }
    }

    static async getItemById(req, res, next) {
        try {
            const {id} = req.params
            const item = await Item.findByPk(id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                },
                include: [
                    {
                        association: "Ingredients",
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    },
                    {
                        model: Category,
                        attributes: ["name"]
                    }
                ]
            })
            
            if (!item) {
                throw {name: "NotFound", message: "Item not found"}
            }
            res.status(200).json(item)
        } catch (error) {
            next(error)
        }
    }

    static async editItem(req, res, next) {
        try {
            const {id} = req.params
            const {item} = req.body

            const editItem = await Item.findByPk(id)

            if (!editItem) {
                throw {name: "NotFound", message: "Item not found"}
            }

            await editItem.update(item)

            res.status(200).json({message: "item successfully updated"})
        } catch (error) {
            next(error)
        }
    }

    static async deleteItem(req, res, next) {
        try {
            const {id} = req.params

            const item = await Item.findByPk(id)

            if (!item) {
                throw {name: "NotFound", message: "Item not found"}
            }
            
            await item.destroy()

            res.status(200).json({message: "item has been deleted"})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller