const orderModel = require("../../models/orderModel");
const userModel = require("../../models/userModel");
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
async function placeOrderController(req, res) {
  try {
    const Order = new orderModel({
      userId: req.body.userId,
      orderItems: req.body.orderItems,
      amount: req.body.amount,
      address: req.body.address,
    });
    const newOrder = await Order.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    if (req.body.address?.payment_method === "cash-on-delivery") {
      return res.json({
        data: newOrder,
        success: true,
        session_url: null,
      });
    }
    const line_items = req.body.orderItems.map((item) => ({
      price_data: {
        currency: "VND",
        product_data: {
          name: item.title,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "VND",
        product_data: {
          name: "Phí vận chuyển",
        },
        unit_amount: 30000,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({
      data: newOrder,
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
module.exports = placeOrderController;
