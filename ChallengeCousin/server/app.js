if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require('express')
const cors = require('cors')
const products = require('./routes/products')
const categories = require("./routes/categories");
const Auth = require('./controllers/auth');
const errorhandler = require('./middlewares/errorHandler');
const authentications = require('./middlewares/authentication');
const public = require('./routes/public');
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World! Server for Phase 3 Challenge 1')
})

app.post("/register", Auth.handleRegister)
app.post("/login", Auth.handleLogin)

app.use("/pub", public)

app.use(authentications)

app.use("/products", products)
app.use("/categories", categories)

app.use(errorhandler)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})