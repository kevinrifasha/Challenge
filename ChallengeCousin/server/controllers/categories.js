const {Category} = require('../models');

class Controller{
    static async createCategory(req, res, next) {
        try {
            const {name} = req.body

            const category = await Category.create({
                name: name
            })

            res.status(201).json(category)
        } catch (error) {
            next(error)
        }
    }

    static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll()

            res.status(200).json(categories)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req, res, next) {
        try {
            const {id} = req.params

            const category = await Category.findByPk(id)

            if (!category) {
                throw {name: "NotFound", message: "category not found"}
            }

            await category.destroy()

            res.status(200).json({message: "category has been deleted"})
        } catch (error) {
            next(error)
        }
    }

    static async editCategory(req, res, next) {
        try {
            const {id} = req.params
            const {name} = req.body

            const category = await Category.findByPk(id)

            if (!category) {
                throw {name: "NotFound", message: "category not found"}
            }

            await category.update({name})

            res.status(200).json({message: "category has been updated"})
        } catch (error) {
            next(error)
        }
    }

    static async getCategoryById(req, res, next) {
        try {
            const {id} = req.params

            const category = await Category.findByPk(id)

            if (!category) {
                throw {name: "NotFound", message: "category not found"}
            }

            res.status(200).json(category)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller