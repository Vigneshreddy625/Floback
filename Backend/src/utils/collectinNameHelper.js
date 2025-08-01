import { Collection } from "../models/collection.model";
import { ApiError } from "./ApiError";
import mongoose from "mongoose";

export const getCollectionNameById = async (collectionId) => {
  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(collectionId)) {
    throw new ApiError(400, `Invalid collectionId format: ${collectionId}`);
  }

  // Find collection
  const collection = await Collection.findById(collectionId).select('name');

  if (!collection) {
    throw new ApiError(404, `Collection not found for ID: ${collectionId}`);
  }

  return collection.name;
};