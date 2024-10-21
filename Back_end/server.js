import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/config/db.js';
import router from './src/routers/authRoutes.js';
import seedProducts from './src/controllers/sendProduct.js';
import productRouter from './src/routers/productRouter.js';
import cartRouter from './src/routers/cartRouter.js';
import bodyparser from 'body-parser';
import orderRouter from './src/routers/orederRouter.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", router);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
connectDB();
const PORT = 3000 || process.env.PORT ;


seedProducts();
app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});