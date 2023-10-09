const express = require('express')
const cors = require('cors');
const conn = require('./libs/Connection')
const employeeRoutes = require('./routes/employeeRoutes')
const app = express()
const corsOptions = {
    origin: ['http://localhost:8000', 'http://127.0.0.1:8000', 'http://172.19.191.78:8000'],  // Puedes ajustar el origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  
app.use(cors(corsOptions));
//app.use(cors())
app.use(express.json())
const path = process.env.API_PREFIX
app.use(path, employeeRoutes)
const port = process.env.PORT

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`)
    conn.open()
})

