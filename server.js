import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/MongoDb.js';
import ImportData from './DataImport.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import orderRouter from './routes/orderRouter.js';
import { errorHandler, notFound } from './middleware/Errors.js';


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// API 
app.use("/api/import", ImportData);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server run on port ${PORT}`));

