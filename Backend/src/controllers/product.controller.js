import {Product} from '../models/product.model.js'; 
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { validationResult } from "express-validator";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js'; 
import fs from 'fs/promises';


export const productUploadMiddleware = upload.fields([
    { name: 'mainImage', maxCount: 1 },       
    { name: 'additionalImages', maxCount: 5 } 
]);

const getAllProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 20, category, material, style, pattern, minPrice, maxPrice } = req.query;
        const query = {};

        if (category) query.category = category;
        if (material) query.material = material;
        if (style) query.style = style;
        if (pattern) query.pattern = pattern;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 } 
        };

        const productsAggregate = Product.aggregate([{ $match: query }]); 

        const products = await Product.aggregatePaginate(productsAggregate, options);


        if (products.docs.length === 0) { 
            return next(new ApiError(404, 'No Products found matching your criteria'));
        }

        res
            .status(200)
            .json(new ApiResponse(200, products, 'Products retrieved successfully'));
    } catch (error) {
        console.error("Error in getAllProducts:", error);
        next(new ApiError(500, 'Internal server error while retrieving products.', error));
    }
};

const addProduct = async (req, res, next) => {
    try {
        console.log("--- addProduct Controller Start ---");
        console.log("req.files:", req.files);
        console.log("req.body (before parsing):", req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("Validation errors:", errors.array());
            if (req.files?.mainImage?.length > 0) {
                await fs.unlink(req.files.mainImage[0].path).catch(e => console.error("Failed to delete local main image on validation error:", e));
            }
            if (req.files?.additionalImages?.length > 0) {
                for (const file of req.files.additionalImages) {
                    await fs.unlink(file.path).catch(e => console.error("Failed to delete local additional image on validation error:", e));
                }
            }
            return next(new ApiError(400, 'Invalid product data', errors.array()));
        }

        const productData = req.body;
        let mainImageUrl = null;
        let additionalImageUrls = []; 
        const parseAndAssign = (key) => {
            if (productData[key] && typeof productData[key] === 'string') {
                try {
                    productData[key] = JSON.parse(productData[key]);
                    // Basic type check for parsed arrays/objects
                    if (key === 'dimensions' && (typeof productData[key] !== 'object' || Array.isArray(productData[key]))) {
                        throw new Error(`Expected object for ${key}`);
                    }
                } catch (e) {
                    console.error(`Failed to parse ${key}:`, e);
                    if (req.files?.mainImage?.length > 0) {
                        fs.unlink(req.files.mainImage[0].path).catch(err => console.error("Failed to delete local main image on JSON parse error:", err));
                    }
                    if (req.files?.additionalImages?.length > 0) {
                        for (const file of req.files.additionalImages) {
                            fs.unlink(file.path).catch(err => console.error("Failed to delete local additional image on JSON parse error:", err));
                        }
                    }
                    return next(new ApiError(400, `Invalid ${key} data format. Please send a valid JSON.`));
                }
            }
        };
        parseAndAssign('dimensions');


        console.log("req.body (after parsing):", productData);

        if (req.files && req.files.mainImage && req.files.mainImage.length > 0) {
            const imageLocalPath = req.files.mainImage[0].path;
            console.log("Main image local path:", imageLocalPath);
            mainImageUrl = await uploadOnCloudinary(imageLocalPath);

            await fs.unlink(imageLocalPath).catch(e => console.error("Failed to delete local main image after Cloudinary upload attempt:", e));

            if (!mainImageUrl) {
                console.error("Cloudinary upload failed for main image.");
                return next(new ApiError(500, 'Failed to upload main product image.'));
            }
            console.log("Main image Cloudinary URL:", mainImageUrl);
        } else {
            console.error("No main product image found in req.files.");
        }

        if (req.files && req.files.additionalImages && req.files.additionalImages.length > 0) {
            console.log(`Processing ${req.files.additionalImages.length} additional images.`);
            const uploadPromises = req.files.additionalImages.map(async (file) => {
                console.log(`Uploading additional image: ${file.originalname} from ${file.path}`);
                const url = await uploadOnCloudinary(file.path);
                await fs.unlink(file.path).catch(e => console.error(`Failed to delete local additional image ${file.path} after Cloudinary attempt:`, e));
                if (url) {
                    console.log(`Additional image uploaded: ${url}`);
                    return url;
                } else {
                    console.warn(`Failed to upload an additional image: ${file.originalname}.`);
                    return null; 
                }
            });
            additionalImageUrls = (await Promise.all(uploadPromises)).filter(url => url !== null); 
        } else {
            console.log("No additional images provided or found.");
        }

        const newProductData = {
            name: productData.name,
            description: productData.description,
            price: parseFloat(productData.price), 
            mainImageUrl: mainImageUrl,
            additionalImageUrls: additionalImageUrls, 
            color: productData.color,
            category: productData.category,
            material: productData.material,
            style: productData.style,
            pattern: productData.pattern,
            dimensions: productData.dimensions,
            inStock: typeof productData.inStock === 'boolean' ? productData.inStock : (productData.inStock === 'true'),
            quantityAvailable: parseInt(productData.quantityAvailable) || 0, 
        };

        const schemaRequiredFields = ['name', 'description', 'price', 'mainImageUrl', 'category', 'inStock', 'quantityAvailable'];
        for (const field of schemaRequiredFields) {
            if (newProductData[field] === undefined || newProductData[field] === null || newProductData[field] === '') {
                if (field === 'price' && newProductData[field] <= 0) {
                     return next(new ApiError(400, `Price must be greater than 0.`));
                }
                if (field === 'quantityAvailable' && newProductData[field] < 0) { 
                     return next(new ApiError(400, `Quantity available cannot be negative.`));
                }
                return next(new ApiError(400, `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required.`)); 
            }
        }
        if (newProductData.dimensions) {
            if (typeof newProductData.dimensions.length !== 'number' || newProductData.dimensions.length < 0) {
                 return next(new ApiError(400, 'Dimensions: length must be a non-negative number.'));
            }
            if (typeof newProductData.dimensions.width !== 'number' || newProductData.dimensions.width < 0) {
                 return next(new ApiError(400, 'Dimensions: width must be a non-negative number.'));
            }
        }

        const product = new Product(newProductData);
        await product.save();
        console.log("Product saved to DB:", product);

        res.status(201).json(new ApiResponse(201, product, 'Product added successfully.'));
        console.log("--- addProduct Controller End (Success) ---");

    } catch (error) {
        console.error("--- addProduct Controller Catch Block ---");
        console.error("Caught error:", error);

        if (req.files) {
            if (req.files.mainImage && req.files.mainImage.length > 0) {
                await fs.unlink(req.files.mainImage[0].path).catch(e => console.error("Failed to clean up local main image on error:", e));
            }
            if (req.files.additionalImages && req.files.additionalImages.length > 0) {
                for (const file of req.files.additionalImages) {
                    await fs.unlink(file.path).catch(e => console.error("Failed to clean up local additional image on error:", e));
                }
            }
        }

        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            console.error("Mongoose Validation Error:", errors.join(', '));
            return next(new ApiError(400, `Validation failed: ${errors.join(', ')}`, error));
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return next(new ApiError(400, `Duplicate value for ${field}: '${error.keyValue[field]}'. Must be unique.`, error));
        }
        if (error.name === 'CastError') {
            console.error("Mongoose Cast Error:", error.message);
            return next(new ApiError(400, `Invalid input for field '${error.path}'.`, error));
        }
        if (error.message.includes('Invalid file type')) {
            console.error("Custom File Type Error:", error.message);
            return next(new ApiError(400, error.message));
        }
        if (error.message.includes('Main product image is required.') || error.message.includes('Failed to upload main product image.')) {
             return next(new ApiError(400, error.message));
        }
         if (error.message.includes('Invalid') && error.message.includes('data format')) {
            return next(new ApiError(400, error.message));
        }

        console.error("Generic Internal Server Error:", error.message, error.stack);
        next(new ApiError(500, 'Internal server error while adding product.', error));
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        console.log("--- deleteProduct Controller Start ---");
        const { productId } = req.params;

        if (!productId) {
            return next(new ApiError(400, 'Product ID is required.'));
        }

        console.log(`Attempting to delete product with productId: ${productId}`);

        const productToDelete = await Product.findOne({ productId: productId });

        if (!productToDelete) {
            return next(new ApiError(404, 'Product not found.'));
        }

        console.log(`Found product to delete: ${productToDelete.name}`);

        await Product.deleteOne({ productId: productId });

        console.log(`Product with productId ${productId} successfully deleted from database`);

        res.status(200).json(
            new ApiResponse(200, { productId: productId }, 'Product deleted successfully')
        );

        console.log("--- deleteProduct Controller End (Success) ---");

    } catch (error) {
        console.error("--- deleteProduct Controller Catch Block ---");
        console.error("Caught error:", error);

        if (error.name === 'CastError') {
            console.error("Mongoose Cast Error:", error.message);
            return next(new ApiError(400, `Invalid product ID format.`, error));
        }

        console.error("Generic Internal Server Error:", error.message, error.stack);
        next(new ApiError(500, 'Internal server error while deleting product.', error));
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { productId: paramProductId } = req.params; 
        const updateData = req.body;
        if (!paramProductId) {
             return next(new ApiError(400, 'Product ID is required.'));
        }
        const productToUpdate = await Product.findOne({ productId: paramProductId });
        if (!productToUpdate) {
            return next(new ApiError(404, 'Product not found.'));
        }

        const allowedUpdates = [
            'name', 'description', 'price', 'mainImageUrl', 'additionalImageUrls', 
            'category', 'material', 'style', 'pattern', 'dimensions',
            'inStock', 'quantityAvailable'
        ];

        const updatesToApply = {};

        const parseAndUpdate = (key) => {
             if (updateData[key] && typeof updateData[key] === 'string') {
                try {
                    updatesToApply[key] = JSON.parse(updateData[key]);
                } catch (e) {
                    console.error(`Failed to parse ${key} during update:`, e);
                    return next(new ApiError(400, `Invalid JSON format for ${key}.`));
                }
            } else {
                updatesToApply[key] = updateData[key];
            }
        };

        for (const key in updateData) {
            if (allowedUpdates.includes(key)) {
                if (key === 'mainImageUrl' || key === 'additionalImageUrls') {
                    updatesToApply[key] = updateData[key];
                } else if (key === 'dimensions') {
                    parseAndUpdate(key); 
                } else if (key === 'price' || key === 'quantityAvailable') {
                    updatesToApply[key] = parseFloat(updateData[key]); 
                } else if (key === 'inStock') {
                    updatesToApply[key] = typeof updateData[key] === 'boolean' ? updateData[key] : (updateData[key] === 'true');
                }
                else {
                    updatesToApply[key] = updateData[key];
                }
            } else {
                console.warn(`Attempted to update disallowed field: ${key}`);
            }
        }


        if (Object.keys(updatesToApply).length === 0) {
            return next(new ApiError(400, 'No valid fields to update provided.'));
        }

        Object.assign(productToUpdate, updatesToApply);
        const updatedProduct = await productToUpdate.save({ validateBeforeSave: true }); 

        res.status(200).json(
            new ApiResponse(200, updatedProduct, 'Product updated successfully')
        );
    } catch (error) {
        console.error('Error updating product:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return next(new ApiError(400, `Validation failed: ${errors.join(', ')}`, error.errors));
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return next(new ApiError(400, `Duplicate value for ${field}: '${error.keyValue[field]}'. Must be unique.`, error));
        }
        if (error.name === 'CastError') {
            console.error("Mongoose Cast Error:", error.message);
            return next(new ApiError(400, `Invalid input for field '${error.path}'.`, error));
        }
        next(new ApiError(500, 'Internal server error while updating product.', error));
    }
};

export { getAllProducts, addProduct, updateProduct };

export const getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return next(new ApiError(400, 'Product ID is required.'));
        }

        const product = await Product.findOne({ productId: productId });

        if (!product) {
            return next(new ApiError(404, 'Product not found.'));
        }

        res.status(200).json(new ApiResponse(200, product, 'Product retrieved successfully.'));
    } catch (error) {
        console.error('Error in getProductById:', error);
        next(new ApiError(500, 'Internal server error while retrieving product.', error));
    }
};