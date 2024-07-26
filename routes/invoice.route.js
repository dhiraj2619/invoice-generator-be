const express = require('express');
const InvoiceController = require('../controllers/invoice.controller');
const invoiceRouter = express.Router();

invoiceRouter.post('/add',InvoiceController.addInvoice);
invoiceRouter.get('/allinvoice',InvoiceController.getAllinvoices);
invoiceRouter.get('/:id',InvoiceController.getInvoiceById);
invoiceRouter.put('/:id',InvoiceController.updateInvoice);
invoiceRouter.delete('/:id',InvoiceController.deleteInvoice);

module.exports = {invoiceRouter}