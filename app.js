const express = require('express')
const cors = require('cors');
const conn = require('./libs/MongooseConnection')
const userRouter = require('./routes/UserRouter')
const productRoutes = require('./routes/productRoutes')
const authJwt = require('./libs/jwt')

const app = express()
const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://172.19.191.78:8000'],  // Puedes ajustar el origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

app.use(express.json())  
app.use(cors(corsOptions));

app.use(authJwt())
app.use('/api/v1/users', userRouter)
app.use(express.json())
const path = process.env.API_PREFIX
app.use(path, productRoutes)

/*
const path2 = process.env.API_ROUTE
app.use(path, productRoutes)
app.use(path2, userRouter)*/
const port = process.env.PORT

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`)
})