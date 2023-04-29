
const product = require('./models/product')
const connectDB = require('./db/connect')
const data = require('./products.json')
require('dotenv').config()





const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        await product.deleteMany()
        await product.create(data)
        console.log('success connection......');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}
start() 