const express = require('express');
const router = express.Router();
const customerController = require('../controller/customerController')
const {verifyJwt} = require('../middlewares/verifyJwt');
router.use(verifyJwt)
router.post('/admin', customerController.createNewCustomer);
router.get('/:salesAgent',customerController.getAllCustomer);
router.put('/:custId',customerController.updateCustomer);
router.delete('/admin/:custId',customerController.deleteCustomer);




module.exports= router;