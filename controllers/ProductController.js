const mongoose = require('mongoose')
const Product = require('../models/Product')
const SupplierProduct = require('../models/SupplierProduct')
const Supplier = require('../models/Supplier')
const findAll = async (req, res) => {
    try{
        const products = await Product.find().populate('category','id name -_id')
        res.send(products)
    }catch(error){
        console.log(error)
    }
}

const findOne = async (req, res) => {
    try{
        const products = await Product.find({"id": parseInt(req.params.id)}).populate('category')
        res.send(products)
    }catch(error){
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

const update = async(req,res)=>{
    try{
        const product = await Product.findOneAndUpdate({"id":req.body.id}, {$set: req.body})
        res.send(product)
    }catch(error){
        res.status(400).send(error.errors)
    }
}

const eliminate = async(req,res)=>{
    try{
        const product = await Product.findOneAndDelete({"id": parseInt(req.params.id)})
        if (product)
            res.send("Product deleted...")
        else
            res.send("Product not found...")
    }catch(error){
        res.status(400).send(error.errors)
    }
}

const productsBySupplier = async (req, res)=> {
    try {
        const products_by_supplier = await SupplierProduct
                                    .find({supplier:new mongoose.Types.ObjectId(req.params.supplier_id)})
                                    .populate('supplier', 'name -_id')
                                    .populate('product', 'id name -_id').select('-_id')
        //res.send(products_by_supplier)
        //se genera un arreglo el cual es de productos para mostrar solo una unica vez al proveedor e imprimir
        //sus productos asignados
        const s = await Supplier.findById(req.params.supplier_id).select('id name -_id')

        let arrProducts = [];
        Object.entries(products_by_supplier).forEach(entry => {
            const [key, value] = entry;
            arrProducts.push(value.product);
        });
        let newObj = {
            supplier_id: s.id,
            supplier_name: s.name,
            products: arrProducts
        }
        res.send(newObj)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {findAll, findOne, save, update, eliminate, productsBySupplier}