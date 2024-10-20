import express from 'express';
const app = express();
app.use(express.json())

const customers = [
    {
        id: 1,
        fullName: "Jackie",
        age: 10,
        class: "5A"
    },
    {
        id: 2,
        fullName: "Jack",
        age: 15,
        class: "5A"
    },
    {
        id: 3,
        fullName: "Denis",
        age: 20,
        class: "5B"
    },
    {
        id: 4,
        fullName: "Jack",
        age: 3,
        class: "5A"
    },
    {
        id: 5,
        fullName: "Micheal D",
        age: 33,
        class: "5A"
    },
]
// phương thức get với base API
// /customers?age=6&name=5B
app.get('/customers', (request, response) => {
    const query = request.query
    const age = query.age
    const name = query.name
    // type: gt (greater than)>, lt (least than)
    // ex: type=gt&age=3
    // whiteList: [type, age, name]
    // blackList: [password, username, secretKey]
    console.log(query)
    let responseData = customers
    if (age) {
        responseData = customers.filter(customer => customer.age > age)
    }
    if (name) {
        responseData = responseData.filter(customer => customer.fullName.toUpperCase().includes(name.toUpperCase()))
    }

    response.send(responseData)
});
// query: ?key=value&key1=value1
app.get('/get-customer-by-id/:customerId', (request, response) => {
    // Chi nhan so

    // //get-customer-by-id/7
    const params = request.params
    console.log(params) // ==>{customerId:3}
    if (params.customerId < 1) {
        response.status(400).send("Loi id lon hon 1")
    }
    const responseData = customers.find(customer => customer.id == request.params.customerId)
    response.send(responseData)
})

app.post("/create-customer", (request, response) => {
    const body = request.body

    const newCustomer = body
    customers.push(newCustomer)
    response.send(customers)
})

// put 
app.put('/edit-customer/:customerId', (request, response) => {
    const customerId = request.params.customerId
    const newCustomers = customers.map(customer => {
        if (customer.id == customerId) {
            return {
                ...customer,
                ...request.body
            }
        }
        return customer
    })
    response.send(newCustomers)
})
app.delete("/delete-customer/:customerId", (request, response) => {
    // customerId khong trung thang nao => 404 user notfound
    const customerId = request.params.customerId
    const newCustomers = customers.filter(customer => customer.id != customerId)

    response.send(newCustomers)
})

app.listen(8080, () => {
    console.log('Server is running!');
});
