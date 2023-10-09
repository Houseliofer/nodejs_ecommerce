const express = require('express')
const conn = require('../libs/Connection')
const router = express.Router()

router.get('/', (req, res) => res.send('Hello World!'))

router.get('/employees', async (req, res) => {
    employees = await conn.db.collection("employees").find().toArray()
    res.send(employees)
})

router.get('/employees/:emp_no', async (req, res) => {
    emp = await conn.db.collection("employees").find({ "emp_no": parseInt(req.params.emp_no) }).toArray()
    res.send(emp)
})
 
router.post('/employees', async function (req, res) {
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
    result = await conn.db.collection("employees").insertOne(emp)*/
    try {
        const emp = conn.db.collection("employees")
        let numEmp = await conn.db.collection('employees').count({})
        const newEmp = req.body;
        newEmp.emp_no = numEmp++

        const result = await emp.insertOne(newEmp)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
   
});

router.put('/employees', async (req, res) => {
    try {
        const result = await conn.db.collection('employees').findOneAndUpdate(
           { "emp_no" : req.body.emp_no },
           { $set:  req.body },
           { upsert:true, returnDocument: 'after' }
        );
        res.send(result)
    } catch (e) {
        console.log(e)
    }
});

router.patch('/employees', async (req, res)=> {
    try {
        const emp = conn.db.collection("employees")
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

router.delete('/employees/:emp_no', async (req, res)=> {
    try {
        const emp = conn.db.collection("employees")
        const result = await emp.findOneAndDelete( { "emp_no":parseInt(req.params.emp_no) });
        if (result)
            res.send("Employee deleted...")
        else
            res.send("Employee not found...")            
    } catch (error) {
        console.log(error)
    }
   
});


//Usuarios examen
router.get('/users/:user_id', async (req, res) => {
    user_id = await conn.db.collection("users").find({ "user_id": parseInt(req.params.user_id) }).toArray()
    res.send(user_id)
})

router.post('/users', async function (req, res) {
    try {
        const user_id = conn.db.collection("users")
        let numUsr = await conn.db.collection('users').count({})
        const newUsr = req.body;
        newUsr.user_id = numUsr++
        const result = await user_id.insertOne(newUsr)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
});

//Orden de compra examen
router.get('/orders', async (req, res) => {
    orders = await conn.db.collection("orders").find().toArray()
    res.send(orders)
})

router.get('/orders/:order_no', async (req, res) => {
    order = await conn.db.collection("orders").find({ "order_no": parseInt(req.params.order) }).toArray()
    res.send(order)
})

module.exports = router