import express from "express";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

const router = express.Router();

// Place an order (checkout)
router.post("/checkout", async (req, res) => {
    const { userId } = req.body;
    try {
        // Find the cart for the user and populate product details (name and image)
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        if (!cart) {
            return res.status(400).json({ message: "Cart not found" });
        }

        const totalAmount = cart.items.reduce((total, item) => {
            return total + item.quantity * item.productId.price;
        }, 0);

        // Map cart items to include product name, image, and quantity
        const orderItems = cart.items.map(item => ({
            productId: item.productId._id,
            name: item.productId.name,
            image: item.productId.image,
            quantity: item.quantity,
        }));

        // Create a new order
        const newOrder = new Order({
            userId,
            items: orderItems,
            totalAmount,
        });

        await newOrder.save();

        // Empty the user's cart after the order is placed
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all orders for a specific user
router.get("/user/:userId", async (req, res) => {
    try {
        // Find all orders for the given user and populate product details
        const orders = await Order.find({ userId: req.params.userId }).populate("items.productId");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get details of a specific order by order ID
router.get("/:orderId", async (req, res) => {
    try {
        // Find the specific order by its ID
        const order = await Order.findById(req.params.orderId).populate("items.productId");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update order status (e.g., Pending -> Shipped -> Delivered)
router.put("/update-status/:orderId", async (req, res) => {
    const { status } = req.body;  // e.g., 'Shipped', 'Delivered'

    try {
        // Find the order by ID and update its status
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.json({ message: "Order status updated", order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
