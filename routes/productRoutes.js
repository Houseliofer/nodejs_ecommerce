const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')

router.get('/', (req, res) => res.send('Hello World!'))

router.get('/products', ProductController.findAll)

router.get('/products/:id', ProductController.findOne)

router.post('/products', ProductController.save)

router.put('/products', ProductController.update)

router.delete('/products/:id', ProductController.eliminate)

router.get('/productsBySupplier/:supplier_id',ProductController.productsBySupplier)

module.exports = router