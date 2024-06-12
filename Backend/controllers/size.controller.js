import Size from "../model/size.model.js"

import isValidSize from "../utils/checkValidSize.js"

export const getSize = async (request, response) => {
    const sizes = await Size.find()

    return response.status(201).send(sizes)
}

export const addSize = async (request, response) => {
    const { name } = request.body

    if (!name) {
        return response
            .status(404).send({
                error: "please filled up all fields"
            })
    }
    const isValid = isValidSize(name)

    if(!isValid){
        return response.status(400).send({error:"Please add a valid size"})
    }

    const existingSize = await Size.findOne({ name })

    if (existingSize) {
        return response.status(400).send({ error: "size already exists" })
    }

    const newSize = await Size.create({ name })
    response.status(201).send(newSize)
}
