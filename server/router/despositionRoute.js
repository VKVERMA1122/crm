const despositionController = require('../controller/despositionController');
const express = require('express');
const router = express.Router();
const {verifyJwt}= require('../middlewares/verifyJwt')
router.use(verifyJwt)

router.post('/:lead_id',despositionController.addDespositon);
router.get('/:lead_id',despositionController.getAllDesposition)

module.exports = router;