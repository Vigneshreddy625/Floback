import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { nanoid } from 'nanoid'; 

const collectionSchema = new mongoose.Schema({
    collectionId: {
        type: String,
        unique: true, 
        required: true, 
        default: () => `COLL${nanoid(6)}`
    },
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnailImageUrl: {
        type: String
    },
    priceRange: {
        min: { type: Number },
        max: { type: Number }
    },
    type: {
        type: String,
        enum: ['PREMIUM', 'CLASSIC', 'CONTEMPORARY'],
        required: true
    },
    fabricCount: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

collectionSchema.plugin(mongooseAggregatePaginate);

export const Collection = mongoose.model('Collection', collectionSchema);