import mongoose, { Schema } from 'mongoose';

const wishlistItemSchema = new Schema({
    itemType: {
        type: String,
        required: true,
        enum: ['Product', 'Fabric'] 
    },
    itemId: {
        type: Schema.Types.ObjectId,
        required: true,
        refPath: 'items.itemType' 
    },
    nameSnapshot: { type: String },
    imageSnapshot: { type: String },
    inStock : { type: Boolean, default: true },
}, { _id: false }); 

const WishlistSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true, 
        },
        items: [wishlistItemSchema],
    },
    { timestamps: true }
);

export const Wishlist = mongoose.model('Wishlist', WishlistSchema);