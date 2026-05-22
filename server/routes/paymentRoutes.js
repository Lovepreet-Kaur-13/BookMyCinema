const { makePayment } = require("../controllers/paymentController");

const paymentRouter = require("express").Router();

paymentRouter.post("/make-payment", makePayment);


module.exports = paymentRouter;