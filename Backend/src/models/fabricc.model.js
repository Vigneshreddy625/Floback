import e from "express";
import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
import { nanoid } from 'nanoid';

const fabricSchema = new mongoose.Schema({
    fabricId: {
        type: String,
        unique: true, 
        required: true, 
        default: () => `FABRIC${nanoid(6)}` 
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    mainImageUrl: {
        type: String,
        required: true
    },
    additionalImageUrls: [{
        type: String
    }],
    material: {
        type: String,
        required: true
    },
    color: {
        type: String,
        trim: true
    },
    pattern: {
        type: String,
        trim: true
    },
    durability: {
        type: String,
        trim: true
    },
}, { timestamps: true });

fabricSchema.plugin(mongooseAggregatePaginate);


export const Fabric = mongoose.model('Fabric', fabricSchema);