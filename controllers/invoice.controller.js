const upload = require("../config/multer.config");
const Invoice = require("../models/invoice.model")


async function generateInvoiceNumber() {
    const prefixInvoice = "IN-";
    const randomNumber = Math.floor(Math.random() * 1000);
    const invoiceNo = `${prefixInvoice}${randomNumber}`;

    const existingInvoiceNumber = await Invoice.findOne({ invoiceNo });

    if (existingInvoiceNumber) {
        return generateInvoiceNumber();
    }
    return invoiceNo;
}
const InvoiceController = {
    addInvoice: async (req, res) => {
        upload.single('companylogo')(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            const companylogo = req.file.path;
            const invoiceNo = await generateInvoiceNumber();
            const invoiceDate = new Date();
           
            try {
                const newInvoice = new Invoice({
                    ...req.body, companylogo,
                    invoiceDetails: {
                        ...req.body.invoiceDetails,
                        invoiceNo,
                        invoiceDate
                    }
                });
                const savedInvoice = await newInvoice.save();
                return res.status(201).json({ message: "invoice saved successfully", savedInvoice })
            } catch (error) {
                res.status(400).json({ message: error.message });
            }
        })

    },
    getAllinvoices: async (req, res) => {
        try {
            const invoices = await Invoice.find().populate('seller');
            res.status(200).json(invoices);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getInvoiceById: async (req, res) => {
        try {
            const invoice = await Invoice.findById(req.params.id).populate('seller');

            if (!invoice) {
                return res.status(400).json({ message: "invoice not found" })
            }
            res.status(200).json(invoice);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateInvoice: async (req, res) => {
        try {
            const updatedInvoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedInvoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            return res.status(200).json({ message: "invoice updated successfully", updatedInvoice });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteInvoice: async (req, res) => {
        try {
            const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
            if (!deletedInvoice) {
                return res.status(404).json({ message: 'Invoice not found' });
            }
            res.status(200).json({ message: 'Invoice deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = InvoiceController