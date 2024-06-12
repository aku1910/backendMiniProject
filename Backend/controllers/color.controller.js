import Color from "../model/color.model.js"
import checkValidColor from "../utils/checkValidColor.js"


export const getColors = async (request, response) => {
    const colors = await Color.find()

    response.status(200).send(colors)
 }

export const addColor = async (request, response) => {
    const { name, hex } = request.body;

    if (!name || !hex) {
        return response.status(404).send({ error: "filled up all field" })
    }

    const validColor = checkValidColor(hex)
    if (!validColor) {
        return response.status(404).send({ error: "Please enter valid Color" })
    }

    const existingColorName = await Color.findOne({ name })

    if (existingColorName) {
        return response.status(400).send({ error: "Color name already exist,Please add a new color" })
    }


    const existingColorValue = await Color.findOne({ hex })

    if (existingColorValue) {
        return response.status(400).send({
            error: "Color Value already exist,Please add a new color"
        })
    }

    const newColor = await Color.create({ name, hex })

    return response.status(201).send(newColor)
}
