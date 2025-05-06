const { Router } = require('express');
const { createCheckoutSession } = require('../controllers/paymentController.js');

const router = Router();

router.post('/create-payment-intent', createCheckoutSession);// Create new payment session


module.exports = router;