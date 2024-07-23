const upload = require("../config/multer.config");
const Seller = require("../models/seller.model");

const generateSellerId = async function() {
    const prefix = "s";
    const randomNumber = Math.floor(Math.random() * 100000);
    const sellerId = `${prefix}${randomNumber}`;

    const existingSeller = await Seller.findOne({ sellerId });

    if (existingSeller) {
        return generateSellerId();
    }
    return sellerId;
};

const sellerController = {
   
    addSeller: async (req, res) => {
        upload.single('signature')(req,res,async(err)=>{
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const signature = req.file.path;
            try {

                const sellerId = await generateSellerId();
                const newSeller = new Seller({ ...req.body, sellerId,signature });
                const savedSeller = await newSeller.save();
    
                return res.status(201).json({ message: "new seller created",seller:savedSeller })
            } catch (error) {
                console.error("Error creating seller:", error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        })
    },
    getAllSellers: async (req, res) => {
        try {
            const sellers = await Seller.find();
            res.status(200).json(sellers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getSellerById: async (req, res) => {
        try {
            const seller = await Seller.findById(req.params.id);
            if (!seller) {
                return res.status(404).json({ message: 'Seller not found' });
            }
            res.status(200).json(seller);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateSeller: async (req, res) => {
        try {
            const updatedSeller = await Seller.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedSeller) {
                return res.status(404).json({ message: 'Seller not found' });
            }
            res.status(200).json(updatedSeller);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteSeller: async (req, res) => {
        try {
            const deletedSeller = await Seller.findByIdAndDelete(req.params.id);
            if (!deletedSeller) {
                return res.status(404).json({ message: 'Seller not found' });
            }
            res.status(200).json({ message: 'Seller deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports =  sellerController 