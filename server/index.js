import express from 'express';
import fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/getProducts', (req, res) => {
    const fileData = fs.readFileSync('./server/dummyData.json', 'utf8');
    const data = JSON.parse(fileData);
    res.send(data);
});

app.post('/getFilteredProducts', (req, res) => {
    const fileData = fs.readFileSync('./server/dummyData.json', 'utf8');
    const data = JSON.parse(fileData);
    const { type, gender, color, size } = req.body;

    let filteredData = data.storeData;

    if (type) filteredData = filteredData.filter((item) => item.type === type);
    if (gender) filteredData = filteredData.filter((item) => item.gender === gender);
    if (color) filteredData = filteredData.filter((item) => item.color.includes(color));
    if (size) filteredData = filteredData.filter((item) => item.size.includes(size));

    res.send(filteredData);
});

app.post('/getSingleProduct', (req, res) => {
    const fileData = fs.readFileSync('./server/dummyData.json', 'utf8');
    const data = JSON.parse(fileData);
    const filter = req.body;
    const filterData = data.storeData.find((item) => item.id === filter.id);
    // if (!filterData) {
    //     return res.status(404).send({ error: 'Product not found' });
    // }
    res.send(filterData);
});

app.post('/saveOrder', (req, res) => {
    const orderData = req.body;
    const filePath = './server/orders.json';

    let existingOrders = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        existingOrders = JSON.parse(fileData);
    }

    const generateOrderId = () => {
        return 'ORD-' + Math.random().toString(36).slice(2, 8).toUpperCase();
    };

    const newOrderId = generateOrderId();
    const currentDateTime = new Date().toISOString();

    const newOrder = {
        ...orderData,
        orderId: newOrderId,
        orderPlacedAt: currentDateTime
    };

    existingOrders.push(newOrder);
    fs.writeFileSync(filePath, JSON.stringify(existingOrders, null, 2));

    res.send({ message: 'Order saved successfully!', orderId: newOrderId, orderPlacedAt: currentDateTime });
});


app.post('/getOrders', (req, res) => {
    const filePath = './server/orders.json';
    const { email } = req.body;

    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        const orders = JSON.parse(fileData);
        const userOrders = orders.filter(order => order.user.email === email);
        res.send(userOrders);
    } else {
        res.send([]);
    }
});


// Save address for user
app.post('/saveAddress', (req, res) => {
    const { email, address } = req.body;
    const filePath = './server/addresses.json';

    let existingAddresses = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        existingAddresses = JSON.parse(fileData);
    }

    let userAddresses = existingAddresses.find((entry) => entry.email === email);

    if (userAddresses) {
        if (!userAddresses.addresses.includes(address)) {
            userAddresses.addresses.push(address);
        }
    } else {
        existingAddresses.push({ email, addresses: [address] });
    }

    fs.writeFileSync(filePath, JSON.stringify(existingAddresses, null, 2));
    res.send({ message: 'Address saved successfully!' });
});

// Get addresses for user
app.post('/getAddresses', (req, res) => {
    const { email } = req.body;
    const filePath = './server/addresses.json';
    let existingAddresses = [];
    if (fs.existsSync(filePath)) {
        const fileData = fs.readFileSync(filePath, 'utf8');
        existingAddresses = JSON.parse(fileData);
    }

    const userAddresses = existingAddresses.find((entry) => entry.email === email);
    res.send(userAddresses ? userAddresses.addresses : []);
});


// Only start server if not in test mode
if (process.env.NODE_ENV !== 'test') {
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
}

export default app;
