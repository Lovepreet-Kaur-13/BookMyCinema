const stripe = require("stripe")(process.env.STRIPE_KEY);
const User = require("../models/userModel");

const makePayment = async (req, res) => {
  try {
    const { amount, description, userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Valid amount is required",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find or create Stripe customer
    const existing = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    let stripeCustomer;

    if (existing.data.length > 0) {
      stripeCustomer = existing.data[0];
    } else {
      stripeCustomer = await stripe.customers.create({
        name: user.name,
        email: user.email,
      });
    }

    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      customer: stripeCustomer.id,
      description,
      receipt_email: user.email,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "PaymentIntent created successfully",
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Stripe error",
    });
  }
};

module.exports = { makePayment };

