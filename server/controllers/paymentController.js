require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { products } = req.body;

  // Validate input
  if (!products || !Array.isArray(products)) {
    return res.status(400).json({ error: "Invalid products data" });
  }

  try {
    const line_items = products.map((product) => {
      // Additional validation
      if (!product.price || !product.quantity) {
        throw new Error("Missing price or quantity");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            description: product.description || "",
            images: product.image ? [product.image] : [],
          },
          unit_amount: Math.round(product.price * 100), // Convert to cents
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"], // Configure as needed
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({
      error: error.message || "Failed to create checkout session",
    });
  }
};

module.exports = {
  createCheckoutSession,
};
