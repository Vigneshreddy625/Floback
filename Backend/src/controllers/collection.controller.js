import {Collection} from '../models/collection.model.js';
import {Fabric} from '../models/fabricc.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { validationResult } from "express-validator";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { upload } from '../middlewares/multer.middleware.js';
import fs from 'fs/promises';

export const collectionUploadMiddleware = upload.single('thumbnailImage');

const getAllCollections = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, type, minPrice, maxPrice } = req.query;
        const query = {};

        if (type) query.type = type;
        if (minPrice || maxPrice) {
            query['priceRange.min'] = {};
            if (minPrice) query['priceRange.min'].$gte = parseFloat(minPrice);
            if (maxPrice) query['priceRange.max'].$lte = parseFloat(maxPrice);
        }

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { createdAt: -1 }
        };

        const collectionsAggregate = Collection.aggregate([{ $match: query }]);
        const collections = await Collection.aggregatePaginate(collectionsAggregate, options);

        if (collections.docs.length === 0) {
            return next(new ApiError(404, 'No Collections found matching your criteria'));
        }

        res.status(200).json(new ApiResponse(200, collections, 'Collections retrieved successfully'));
    } catch (error) {
        console.error("Error in getAllCollections:", error);
        next(new ApiError(500, 'Internal server error while retrieving collections.', error));
    }
};

const addCollection = async (req, res, next) => {
    try {
        console.log("--- addCollection Controller Start ---");
        console.log("req.file:", req.file);
        console.log("req.body:", req.body);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.error("Validation errors:", errors.array());
            if (req.file) {
                await fs.unlink(req.file.path).catch(e => console.error("Failed to delete local thumbnail image on validation error:", e));
            }
            return next(new ApiError(400, 'Invalid collection data', errors.array()));
        }

        const collectionData = req.body;
        let thumbnailImageUrl = null;

        // Parse nested objects
        const parseAndAssign = (key) => {
            if (collectionData[key] && typeof collectionData[key] === 'string') {
                try {
                    collectionData[key] = JSON.parse(collectionData[key]);
                } catch (e) {
                    console.error(`Failed to parse ${key}:`, e);
                    if (req.file) {
                        fs.unlink(req.file.path).catch(err => console.error("Failed to delete local thumbnail image on JSON parse error:", err));
                    }
                    return next(new ApiError(400, `Invalid ${key} data format. Please send a valid JSON.`));
                }
            }
        };
        parseAndAssign('priceRange');

        if (req.file) {
            const imageLocalPath = req.file.path;
            console.log("Thumbnail image local path:", imageLocalPath);
            thumbnailImageUrl = await uploadOnCloudinary(imageLocalPath);

            await fs.unlink(imageLocalPath).catch(e => console.error("Failed to delete local thumbnail image after Cloudinary upload attempt:", e));

            if (!thumbnailImageUrl) {
                console.error("Cloudinary upload failed for thumbnail image.");
                return next(new ApiError(500, 'Failed to upload collection thumbnail image.'));
            }
            console.log("Thumbnail image Cloudinary URL:", thumbnailImageUrl);
        }

        const newCollectionData = {
            name: collectionData.name,
            description: collectionData.description,
            thumbnailImageUrl: thumbnailImageUrl,
            priceRange: collectionData.priceRange,
            type: collectionData.type
        };

        const schemaRequiredFields = ['name', 'description', 'type'];
        for (const field of schemaRequiredFields) {
            if (newCollectionData[field] === undefined || newCollectionData[field] === null || newCollectionData[field] === '') {
                return next(new ApiError(400, `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required.`));
            }
        }

        const collection = new Collection(newCollectionData);
        await collection.save();

        console.log("Collection saved to DB:", collection);
        res.status(201).json(new ApiResponse(201, collection, 'Collection added successfully.'));
        console.log("--- addCollection Controller End (Success) ---");

    } catch (error) {
        console.error("--- addCollection Controller Catch Block ---");
        console.error("Caught error:", error);

        if (req.file) {
            await fs.unlink(req.file.path).catch(e => console.error("Failed to clean up local thumbnail image on error:", e));
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

        console.error("Generic Internal Server Error:", error.message, error.stack);
        next(new ApiError(500, 'Internal server error while adding collection.', error));
    }
};

const getCollectionById = async (req, res, next) => {
    try {
        const { collectionId } = req.params;

        if (!collectionId) {
            return next(new ApiError(400, 'Collection ID is required.'));
        }

        const collection = await Collection.findOne({ collectionId: collectionId });

        if (!collection) {
            return next(new ApiError(404, 'Collection not found.'));
        }

        res.status(200).json(new ApiResponse(200, collection, 'Collection retrieved successfully.'));
    } catch (error) {
        console.error('Error in getCollectionById:', error);
        next(new ApiError(500, 'Internal server error while retrieving collection.', error));
    }
};

const getCollectionWithFabrics = async (req, res, next) => {
    try {
        const { collectionId } = req.params;

        if (!collectionId) {
            return next(new ApiError(400, 'Collection ID is required.'));
        }

        const collection = await Collection.findOne({ collectionId: collectionId });

        if (!collection) {
            return next(new ApiError(404, 'Collection not found.'));
        }

        const fabrics = await Fabric.find({ collectionId: collection._id });

        const responseData = {
            collection,
            fabrics,
            fabricCount: fabrics.length
        };

        res.status(200).json(new ApiResponse(200, responseData, 'Collection with fabrics retrieved successfully.'));
    } catch (error) {
        console.error('Error in getCollectionWithFabrics:', error);
        next(new ApiError(500, 'Internal server error while retrieving collection with fabrics.', error));
    }
};

const updateCollection = async (req, res, next) => {
    try {
        const { collectionId: paramCollectionId } = req.params;
        const updateData = req.body;

        if (!paramCollectionId) {
            return next(new ApiError(400, 'Collection ID is required.'));
        }

        const collectionToUpdate = await Collection.findOne({ collectionId: paramCollectionId });
        if (!collectionToUpdate) {
            return next(new ApiError(404, 'Collection not found.'));
        }

        const allowedUpdates = ['name', 'description', 'thumbnailImageUrl', 'priceRange', 'type'];
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
                if (key === 'priceRange') {
                    parseAndUpdate(key);
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

        Object.assign(collectionToUpdate, updatesToApply);
        const updatedCollection = await collectionToUpdate.save({ validateBeforeSave: true });

        res.status(200).json(
            new ApiResponse(200, updatedCollection, 'Collection updated successfully')
        );
    } catch (error) {
        console.error('Error updating collection:', error);
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return next(new ApiError(400, `Validation failed: ${errors.join(', ')}`, error.errors));
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return next(new ApiError(400, `Duplicate value for ${field}: '${error.keyValue[field]}'. Must be unique.`, error));
        }
        next(new ApiError(500, 'Internal server error while updating collection.', error));
    }
};

const deleteCollection = async (req, res, next) => {
    try {
        const { collectionId } = req.params;

        if (!collectionId) {
            return next(new ApiError(400, 'Collection ID is required.'));
        }

        const collection = await Collection.findOne({ collectionId: collectionId });

        if (!collection) {
            return next(new ApiError(404, 'Collection not found.'));
        }

        const fabricCount = await Fabric.countDocuments({ collectionId: collection._id });
        if (fabricCount > 0) {
            return next(new ApiError(400, 'Cannot delete collection with existing fabrics. Please delete all fabrics first.'));
        }

        await Collection.findOneAndDelete({ collectionId: collectionId });

        res.status(200).json(new ApiResponse(200, null, 'Collection deleted successfully.'));
    } catch (error) {
        console.error('Error deleting collection:', error);
        next(new ApiError(500, 'Internal server error while deleting collection.', error));
    }
};

export { 
    getAllCollections, 
    addCollection, 
    getCollectionById, 
    getCollectionWithFabrics, 
    updateCollection, 
    deleteCollection 
};