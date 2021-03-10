const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/sales', db.getSales)
app.get('/sales/:keyword', db.getSalesKeyword)
app.put('/add-sales', db.createSales)
// app.get('/users/:id', db.getSalesById)
// app.put('/users/:id', db.updateSales)
// app.delete('/users/:id', db.deleteSales)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})