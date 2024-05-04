import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://ahsan:ahsan123@cluster0.eha8cgm.mongodb.net/OrderStatusDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//defining orderStatus Collection
const OrderStatusSchema = new mongoose.Schema({
    ShopDomain: String,
    Script: String,
});

//Creating OrderStatus Model
export const OrderStatusDB = mongoose.model('OrderStatus', OrderStatusSchema);
