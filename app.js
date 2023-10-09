const express = require('express')
const conn = require('./libs/MongooseConnection')
const productRoutes = require('./routes/productRoutes')
const app = express()
app.use(express.json())
const path = process.env.API_PREFIX
app.use(path, productRoutes)

const port = process.env.PORT

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`)
})