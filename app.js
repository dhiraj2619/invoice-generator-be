require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { invoiceRouter } = require('./routes/invoice.route');
const { sellerRouter } = require('./routes/seller.route');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.error("Failed to connect to DB", error);
    }
};

app.use(express.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.get('/', (req, res) => {
    res.send('<center><h1>Welcome to Invoice Generator</h1></center>');
});

app.use('/api/invoice',cors(corsOptions),invoiceRouter);
app.use('/api/seller',sellerRouter);

app.listen(port,()=>{
    connectToDb();
    console.log(`the server is running on http://localhost:${port}`);
})