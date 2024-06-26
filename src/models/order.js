import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user', 
    },
    lastName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    address: {  
        type: String,
        required: true,
    },
    items: [
        {
        type: Schema.Types.ObjectId,
        ref: 'product', 
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model('order', OrderSchema);

export default Order;
