const  sellerController  = require('../controllers/seller.controller');

const sellerRouter = require('express').Router();

sellerRouter.post('/addsellers',sellerController.addSeller);
sellerRouter.get('/allsellers',sellerController.getAllSellers);
sellerRouter.get('/sellers/:id',sellerController.getSellerById);
sellerRouter.put('/sellers/:id',sellerController.updateSeller);
sellerRouter.delete('/sellers/:id',sellerController.deleteSeller);

module.exports = {sellerRouter}