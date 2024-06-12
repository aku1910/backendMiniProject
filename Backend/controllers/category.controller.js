import Category from "../model/category.model.js"

export const getCategories = async (request, response) => {
    const categories = await Category.find()

    return response.status(201).send(categories)
}


export const addCategory = async (request, response) => {
    const { name, slug } = request.body;

    if (!name || !slug) {
        return response.status(400).send({ error: "filled up all fields" })
    }

    const existingCategoryName = await Category.findOne({ name })

    if (existingCategoryName) {
        return response.status(400).send({ error: "category name already exists.please add a new category name" })
    }

    const existingCategorySlug = await Category.findOne({ slug })

    if (existingCategorySlug) {
        return response.status(400).send({ error: "category Slug already exists.please add a new category name" })
    }

    const newCategory = await Category.create({ name, slug })
    return response.status(201).send(newCategory)
}