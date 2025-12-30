const mongoose = require('mongoose')
// --- DATABASE SCHEMA & MODEL ---
messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now },
    business: { type: String, required: false}
});
module.exports.Message = mongoose.model('Message', messageSchema);

userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: false },
    email: { type: String, required: false },
    date: { type: Date, default: Date.now },
    business: { type: String, required: false }
})
module.exports.User = mongoose.model('User', userSchema);

categorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false }
});
module.exports.Category = mongoose.model('Category', categorySchema);

productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    modifications: { type: Array, required: false },
    img: { type: String, required: false },    
    description: { type: String, required: false }
});
module.exports.Product = mongoose.model('Product', productSchema);

serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    duration: { type: Number, required: false }, // duration in minutes
    appointment: { type: Date, required: false }
});
module.exports.Service = mongoose.model('Service', serviceSchema);