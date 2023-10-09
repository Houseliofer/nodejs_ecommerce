const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const ProductController = require('../controllers/ProductController')

router.get('/', (req, res) => res.send('Hello World!'))

router.get('/products', ProductController.findAll)
router.get('/products/:id', ProductController.findOne)
router.post('/products', ProductController.save)

module.exports = router