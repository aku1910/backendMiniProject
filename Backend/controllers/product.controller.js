import Product from "../model/product.model.js";
import Size from "../model/size.model.js";
import Color from "../model/color.model.js";

export const getProducts = async (request, response) => {
    const products = await Product.find()

    if (!products) {
        return response.status(404).send({ error: "something is wrong" })
    }

    response.status(200).send(products)

};

export const getSingleProduct = async (request, response) => {
    const { productId } = request.params;
    const singleProduct = await Product.findById(productId);

    if (!singleProduct) {
        return response.status(404).send({ error: "something is wrong" })
    }

    response.status(200).send(singleProduct)
};

export const addSingleProduct = async (request, response) => {
    const { title, price, category, slug, description, size, color, quantity, sku } = request.body;
    const { path } = request.file;

    if (!title || !price || !category || !slug || !description || !sku || !path || !size || !color || !quantity) {
        return response.status(400).send({ error: "Please fill up all fields" });
    }

    console.log(sku);


    const existingSpecificProduct = await Product.findOne({ sku })
        .populate('stock.color')
        .populate('stock.size');

    console.log(existingSpecificProduct);

    const givenColor = await Color.findOne({ _id: color });
    const givenSize = await Size.findOne({ _id: size });

    if (existingSpecificProduct) {
        const existingSpecificProductStock = existingSpecificProduct.stock.some((stockItem) => {
            return (
                stockItem.color.name === givenColor.name &&
                stockItem.size.name === givenSize.name
            );
        });

        if (existingSpecificProductStock) {
            const stockIndex = existingSpecificProduct.stock.findIndex((stockItem) => {
                return (
                    stockItem.color.name === givenColor.name &&
                    stockItem.size.name === givenSize.name
                );
            });

            existingSpecificProduct.stock[stockIndex].quantity = +quantity +
                +existingSpecificProduct.stock[stockIndex].quantity;

            await existingSpecificProduct.save();
            return response.status(200).send(existingSpecificProduct);
        }
        if (!existingSpecificProductStock) {
            existingSpecificProduct.stock.push({ quantity, size, color })
            await existingSpecificProduct.save()
            response.status(201).send(existingSpecificProduct)
        }

    }

    const stock = { quantity, size, color };
    const newProduct = await Product.create({
        title,
        price,
        category,
        slug,
        sku,
        stock,
        description,
        productPic: path,
    });

    response.status(201).send(newProduct);

};
