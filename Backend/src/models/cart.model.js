import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    itemType: {
        type: String,
        required: true,
        enum: ['Product', 'Fabric']
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    // 👉 Store extra fields directly inside item
    name: String,
    mainImageUrl: String,
    price: Number
}, { _id: false });

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
