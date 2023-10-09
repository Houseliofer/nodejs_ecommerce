const Product = require('../models/Product')
const findAll = async (req, res) => {
    try {
        const products = await Product.find().populate('category')
        res.send(products)
    } catch (error) {
        console.log(error)
    }
}

const findOne = async (req, res) => {
    try {
        const products = await Product.find({ "id": parseInt(req.params.id) }).populate('category')
        res.send(products)
    } catch (error) {
        console.log(error)
    }
}

const save = async (req, res) => {
    try {
        let objNewProduct = req.body
        /*let totalProducts = await Product.count({});
        objNewProduct.id = totalProducts++*/
        const p = await Product.find().sort({"id":-1}).limit(1)
        objNewProduct.id = parseInt(p[0].id) + 1

        objNewProduct.category = new mongoose.Types.ObjectId(req.body.category)
        const product = new Product(objNewProduct)
        let savedProduct = await product.save()
        res.send(savedProduct)
       
    } catch (error) {
        //console.log(error.errors)
        res.status(400).send(error.errors)
    }
}

module.exports = {findAll,findOne,save}