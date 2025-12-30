const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Mock Data (Arrays)
let customers = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    // Add more customer objects as needed
];

let products = [
    {
        id: '1',
        name: 'Wireless Earbuds',
        sku: 'WE-001',
        price: 59.99,
        stock: 100,
        category: 'Electronics'
    },
    // Add more product objects as needed
];

let orders = [
    {
        id: '1',
        customerEmail: 'john@example.com',
        items: [
            { productId: '1', name: 'Wireless Earbuds', quantity: 2, price: 59.99 }
        ],
        totalAmount: 119.98,
        paymentMethod: 'Card'
    }
];

// --- API ROUTES ---
// Products
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products/add', (req, res) => {
    const { name, sku, price, stock = 0, category } = req.body;
    const newProduct = {
        id: products.length + 1,
        name,
        sku,
        price,
        stock,
        category
    };
    products.push(newProduct);
    res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// Update Stock
app.post('/api/products/:id/stock', (req, res) => {
    const { quantity } = req.body;
    const product = products.find(p => p.id === req.params.id);
    if (!product) return res.status(404).send('Product not found');
    product.stock += quantity; // Simplified stock update
    res.json(product);
});

// Orders (POS)
app.post('/api/orders/checkout', (req, res) => {
    const { customerEmail, items, paymentMethod } = req.body;
    let total = 0;

    // Find Customer
    const customer = customers.find(c => c.email === customerEmail);

    // Validate Stock and Calculate Total
    for (const item of items) {
        const product = products.find(p => p.id === item.productId);
        if (!product || product.stock < item.quantity) return res.status(400).send('Insufficient stock');
        product.stock -= item.quantity;
        total += item.price * item.quantity;
    }

    // Create Order
    const newOrder = {
        id: orders.length + 1,
        customerEmail,
        items,
        totalAmount: total,
        paymentMethod
    };
    orders.push(newOrder);
    res.json({ message: "Order processed successfully", order: newOrder });
});

app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Customers
app.get('/api/customers', (req, res) => {
    res.json(customers);
});

app.post('/api/customers', (req, res) => {
    const { name, email } = req.body;
    customers.push({ id: customers.length + 1, name, email });
    res.json({ message: "Customer added successfully", customer: { id: customers.length, name, email } });
});

app.get('/api/customers/:id', (req, res) => {
    const customer = customers.find(c => c.id === req.params.id);
    if (!customer) return res.status(404).send('Customer not found');
    res.json(customer);
});

// --- VIEW ROUTES ---
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// --- START SERVER ---
app.listen(PORT, () => {
    console.log(`🚀 POS Server running at http://localhost:${PORT}`);
});