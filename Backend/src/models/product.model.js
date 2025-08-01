import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import { nanoid } from 'nanoid'; 
const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        unique: true, 
        required: true, 
        default: () => `PROD${nanoid(6)}`
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        default : 'Product',
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        trim: true
    },
    mainImageUrl: {
        type: String,
        required: true
    },
    additionalImageUrls: [{
        type: String
    }],
    category: {
        type: String,
        required: true,
        enum: ['Ready-Made Curtains', 'Bed & Bath', 'Sofa Upholstery', 'Curtains & Blinds', 'Wallpaper']
    },
    material: {
        type: String,
        trim: true
    },
    style: {
        type: String,
        trim: true
    },
    pattern: {
        type: String,
        trim: true
    },
    dimensions: {
        length: { type: Number },
        width: { type: Number },
        unit: { type: String, default: 'inches' }
    },
    inStock: {
        type: Boolean,
        default: true,
        required: true
    },
    quantityAvailable: {
        type: Number,
        default: 0
    },
    features: [{
        type: String,
        trim: true
    }],
}, { timestamps: true });

productSchema.plugin(mongooseAggregatePaginate);

export const Product = mongoose.model('Product', productSchema);