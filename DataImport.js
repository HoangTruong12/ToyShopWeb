import express from 'express';
import User from './models/userModel.js';
import users from './data/users.js';
import Product from './models/productModel.js';
import products from './data/Products.js';
import asyncHandler from 'express-async-handler';


const ImportData = express.Router();

ImportData.post("/user", asyncHandler(
    async (req, res) => {
        await User.remove({})
        const importUser = await User.insertMany(users);
        res.send({importUser});
    }
));

ImportData.post("/products", asyncHandler(
    async (req, res) => {
        //use 'remove()' function to remove all document in collection and insert new
        await Product.remove({})
        const importProducts = await Product.insertMany(products);
        res.send({importProducts});
    }
));


export default ImportData;