const express = require('express')
const app = express()
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')
const connectDB = require('./db/connect.js')
const products = require('./routes/products')
require('dotenv').config()

const port =process.env.PORT || 3000 

// middleware
app.use(express.json())


// routes
app.use('/api/v1/products', products)
app.use(notFound)
app.use(errorHandler)


const start =async () =>{
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=> console.log(`app listening on port ${port}!`))
    } catch (error) {
        console.log(error)
    }
}

start()
