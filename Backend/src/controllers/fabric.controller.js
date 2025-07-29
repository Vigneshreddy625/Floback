// controllers/fabricController.js
import {Fabric} from '../models/fabricc.model.js';
import {Collection} from '../models/collection.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { validationResult } from "express-validator";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js';
import fs from 'fs/promises';

export const fabricUploadMiddleware = upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 }
]);

const getAllFabrics = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, collectionId, material, color, pattern, minPrice, maxPrice } = req.query;
        const query = {};

        if (collectionId) query.collectionId = collectionId;
        if (material) query.material = material;
        if (color) query.color = color;
        if (pattern) query.pattern = pattern;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 },
            populate: [{ path: 'collectionId', select: 'name type' }]
        };

        const fabricsAggregate = Fabric.aggregate([{ $match: query }]);
        const fabrics = await Fabric.aggregatePaginate(fabricsAggregate, options);

        if (fabrics.docs.length === 0) {
            return next(new ApiError(404, 'No Fabrics found matching your criteria'));
        }

        res.status(200).json(new ApiResponse(200, fabrics, 'Fabrics retrieved successfully'));
    } catch (error) {
        console.error("Error in getAllFabrics:", error);
        next(new ApiError(500, 'Internal server error while retrieving fabrics.', error));
    }
};

const addFabric = async (req, res, next) => {
    try {
        console.log("--- addFabric Controller Start ---");
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
            return next(new ApiError(400, 'Invalid fabric data', errors.array()));
        }

        const fabricData = req.body;
        let mainImageUrl = null;
        let additionalImageUrls = [];

        // Verify collection exists
        if (fabricData.collectionId) {
            const collection = await Collection.findById(fabricData.collectionId);
            if (!collection) {
                return next(new ApiError(404, 'Collection not found.'));
            }
        }

        // Handle main image upload
        if (req.files && req.files.mainImage && req.files.mainImage.length > 0) {
            const imageLocalPath = req.files.mainImage[0].path;
            console.log("Main image local path:", imageLocalPath);
            mainImageUrl = await uploadOnCloudinary(imageLocalPath);

            await fs.unlink(imageLocalPath).catch(e => console.error("Failed to delete local main image after Cloudinary upload attempt:", e));

            if (!mainImageUrl) {
                console.error("Cloudinary upload failed for main image.");
                return next(new ApiError(500, 'Failed to upload main fabric image.'));
            }
            console.log("Main image Cloudinary URL:", mainImageUrl);
        } else {
            console.error("No main fabric image found in req.files.");
            return next(new ApiError(400, 'Main fabric image is required.'));
        }

        // Handle additional images
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
        }

        const newFabricData = {
            name: fabricData.name,
            collectionId: fabricData.collectionId,
            description: fabricData.description,
            price: parseFloat(fabricData.price),
            mainImageUrl: mainImageUrl,
            additionalImageUrls: additionalImageUrls,
            material: fabricData.material,
            color: fabricData.color,
            pattern: fabricData.pattern,
            durability: fabricData.durability
        };

        const schemaRequiredFields = ['name', 'collectionId', 'description', 'price', 'mainImageUrl', 'material'];
        for (const field of schemaRequiredFields) {
            if (newFabricData[field] === undefined || newFabricData[field] === null || newFabricData[field] === '') {
                if (field === 'price' && newFabricData[field] <= 0) {
                    return next(new ApiError(400, `Price must be greater than 0.`));
                }
                return next(new ApiError(400, `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required.`));
            }
        }

        const fabric = new Fabric(newFabricData);
        await fabric.save();

        // Update fabric count in collection
        await Collection.findByIdAndUpdate(
            fabricData.collectionId,
            { $inc: { fabricCount: 1 } }
        );

        console.log("Fabric saved to DB:", fabric);
        res.status(201).json(new ApiResponse(201, fabric, 'Fabric added successfully.'));
        console.log("--- addFabric Controller End (Success) ---");

    } catch (error) {
        console.error("--- addFabric Controller Catch Block ---");
        console.error("Caught error:", error);

        // Clean up uploaded files on error
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

        console.error("Generic Internal Server Error:", error.message, error.stack);
        next(new ApiError(500, 'Internal server error while adding fabric.', error));
    }
};

const getFabricById = async (req, res, next) => {
    try {
        const { fabricId } = req.params;

        if (!fabricId) {
            return next(new ApiError(400, 'Fabric ID is required.'));
        }

        const fabric = await Fabric.findOne({ fabricId: fabricId }).populate('collectionId', 'name type');

        if (!fabric) {
            return next(new ApiError(404, 'Fabric not found.'));
        }

        res.status(200).json(new ApiResponse(200, fabric, 'Fabric retrieved successfully.'));
    } catch (error) {
        console.error('Error in getFabricById:', error);
        next(new ApiError(500, 'Internal server error while retrieving fabric.', error));
    }
};

const updateFabric = async (req, res, next) => {
    try {
        const { fabricId: paramFabricId } = req.params;
        const updateData = req.body;

        if (!paramFabricId) {
            return next(new ApiError(400, 'Fabric ID is required.'));
        }

        const fabricToUpdate = await Fabric.findOne({ fabricId: paramFabricId });
        if (!fabricToUpdate) {
            return next(new ApiError(404, 'Fabric not found.'));
        }

        const allowedUpdates = [
            'name', 'description', 'price', 'mainImageUrl', 'additionalImageUrls',
            'material', 'color', 'pattern', 'durability'
        ];

        const updatesToApply = {};

        for (const key in updateData) {
            if (allowedUpdates.includes(key)) {
                if (key === 'price') {
                    updatesToApply[key] = parseFloat(updateData[key]);
                } else {
                    updatesToApply[key] = updateData[key];
                }
            } else {
                console.warn(`Attempted to update disallowed field: ${key}`);
            }
        }

        if (Object.keys(updatesToApply).length === 0) {
            return next(new ApiError(400, 'No valid fields to update provided.'));
        }

        Object.assign(fabricToUpdate, updatesToApply);
        const updatedFabric = await fabricToUpdate.save({ validateBeforeSave: true });

        res.status(200).json(
            new ApiResponse(200, updatedFabric, 'Fabric updated successfully')
        );
    } catch (error) {
        console.error('Error updating fabric:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return next(new ApiError(400, `Validation failed: ${errors.join(', ')}`, error.errors));
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return next(new ApiError(400, `Duplicate value for ${field}: '${error.keyValue[field]}'. Must be unique.`, error));
        }
        if (error.name === 'CastError') {
            return next(new ApiError(400, `Invalid input for field '${error.path}'.`, error));
        }
        next(new ApiError(500, 'Internal server error while updating fabric.', error));
    }
};

const deleteFabric = async (req, res, next) => {
    try {
        const { fabricId } = req.params;

        if (!fabricId) {
            return next(new ApiError(400, 'Fabric ID is required.'));
        }

        const fabric = await Fabric.findOneAndDelete({ fabricId: fabricId });

        if (!fabric) {
            return next(new ApiError(404, 'Fabric not found.'));
        }

        await Collection.findByIdAndUpdate(
            fabric.collectionId,
            { $inc: { fabricCount: -1 } }
        );

        res.status(200).json(new ApiResponse(200, null, 'Fabric deleted successfully.'));
    } catch (error) {
        console.error('Error deleting fabric:', error);
        next(new ApiError(500, 'Internal server error while deleting fabric.', error));
    }
};

export { getAllFabrics, addFabric, getFabricById, updateFabric, deleteFabric };