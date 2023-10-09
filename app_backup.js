const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
app.use(express.json())
const port = 3000

var db = null

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/api/employees', async (req, res) => {
    employees = await db.collection("employees").find().toArray()
    res.send(employees)
})

app.get('/api/employees/:emp_no', async (req, res) => {
    emp = await db.collection("employees").find({ "emp_no": parseInt(req.params.emp_no) }).toArray()
    res.send(emp)
})

app.post('/api/employees', async function (req, res) {
    /*newEmp = {
        "emp_no": req.body.emp_no,
        "first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "email": req.body.email,
        "gender": req.body.gender,
        "birth_date": req.body.birth_date,
        "hire_date": req.body.hire_date,
        "salary": req.body.salary,
        "department": req.body.department
    }
    result = await db.collection("employees").insertOne(emp)*/
    try {
        const emp = db.collection("employees")
        let numEmp = await db.collection('employees').count({})
        const newEmp = req.body;
        newEmp.emp_no = numEmp++

        const result = await emp.insertOne(newEmp)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
   
});

app.put('/api/employees', async (req, res) => {
    try {
        const result = await db.collection('employees').findOneAndUpdate(
           { "emp_no" : req.body.emp_no },
           { $set:  req.body },
           { upsert:true, returnDocument: 'after' }
        );
        res.send(result)
    } catch (e) {
        console.log(e)
    }
});

app.patch('/api/employees', async (req, res)=> {
    try {
        const emp = db.collection("employees")
        const result = await emp.findOneAndUpdate( { "emp_no":req.body.emp_no }, {$set: req.body});
        if (result)
        {
            //res.send("Employee patched...")
            res.send(result)    
        } else {
            res.send("Employee not found..." + req.body.cve_emp)
        }
    } catch (e) {
        console.log(e)
    }    
   
});

app.delete('/api/employees/:emp_no', async (req, res)=> {
    try {
        const emp = db.collection("employees")
        const result = await emp.findOneAndDelete( { "emp_no":parseInt(req.params.emp_no) });
        if (result)
            res.send("Employee deleted...")
        else
            res.send("Employee not found...")            
    } catch (error) {
        console.log(error)
    }
   
});


app.listen(port, async () => {
    console.log(`Example app listening on port ${port}!`)
    try {
        const client = new MongoClient(CONN_STRING)
        await client.connect()
        db = client.db("e-commerce")
        console.log("MongoDB connection success...")
    } catch (error) {
        console.log(error)
    }
})

