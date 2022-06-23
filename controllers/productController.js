import asyncHandler from 'express-async-handler';
import Product from './../models/productModel.js';

const productController = {
    getAllProducts: asyncHandler(
        async(req, res) => {
            // Pagination
            // pageSize: so luong san pham trong 1 trang
            const pageSize = 9;
            const page = Number(req.query.pageNumber) || 1
            
            // Search
            const keyword = req.query.keyword ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i"
                },
            }
            : {};
            const count = await Product.countDocuments({...keyword});
            const products = await Product.find({...keyword})
                .limit(pageSize)
                .skip(pageSize * (page -1))
                .sort({_id: -1});
            res.json({products, page, pages: Math.ceil(count / pageSize)});
        }
    ),
    getAllProductsAdmin: asyncHandler(async(req, res) => {
        const products = await Product.find({}).sort({_id: -1});
        res.json(products);
    }),
    getSingleProduct: asyncHandler(
        async(req, res) => {
            const product = await Product.findById(req.params.id);
            if(product) {
                res.json(product);
            } else {
                res.status(404);
                throw new Error('Product not found');
            }
        }
    ),
    reviewProduct: asyncHandler(
        async(req, res) => {
            const {rating, comment} = req.body;
            const product = await Product.findById(req.params.id);
            if(product) {
                const alreadyReviewed = product.reviews.find(
                    (r) => r.user.toString() === req.user._id.toString()
                )
                if(alreadyReviewed) {
                    res.status(400);
                    throw new Error("Sản phẩm đã được đánh giá");
                }
                const review = {
                    name: req.user.name,
                    rating: Number(rating),
                    comment,
                    createdAt: Date.now(),
                    user: req.user._id,
                };
    
                product.reviews.push(review);
                product.numReviews = product.reviews.length;
                product.rating = 
                    product.reviews.reduce(
                        (acc, item) => item.rating + acc, 0) / product.reviews.length;
                    await product.save();
                    res.status(201).json({message: "Reviewed Added"});
                
            } else {
                res.status(404);
                throw new Error('Product not found');
            }
        }
    ),
    deleteProductAdmin: asyncHandler(async(req, res) => {
            const product = await Product.findById(req.params.id);
            if(product) {
                await product.remove();
                res.json({message: "Product deleted"})
            } else {
                res.status(404);
                throw new Error('Product not found');
            }
        }
    ),
    createProductAdmin: asyncHandler(async(req, res) => {
            const {name, price, countInStock, description, image} = req.body;
            const productExist = await Product.findOne({name})
            if(productExist) {
                res.status(400);
                throw new Error('Product name already exist');
            } else {
                const product = new Product({
                    name, 
                    price, 
                    countInStock,
                    description, 
                    image,
                    user: req.user._id,
                });
                if(product) {
                    const createdProduct = await product.save();
                    res.status(201).json(createdProduct);
                } else {
                    res.status(404);
                    throw new Error('Invalid product data');
                }
            }
        }
    ),
    updateProductAdmin: asyncHandler(async(req, res) => {
        const {name, price, description, image, countInStock} = req.body;
        const product = await Product.findById(req.params.id)
        if(product) {
            product.name = name || product.name;
            product.price = price || product.price;
            product.description = description || product.description;
            product.image = image || product.image;
            product.countInStock = countInStock || product.countInStock;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        } else {
                res.status(404);
                throw new Error('Product not found');
            }
        }
    )
};

export default productController;