import express from 'express';
import Cart from '../models/cartModel.js';

const router = express.Router();





// GET CART BY USER ID
router.get("/:userId", async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.productId");
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ADD TO CART
router.post("/add", async (req, res) => {
    try {
        const { userId, productId, quantity, name, image, price } = req.body;

        if (!userId || !productId || !quantity || !name || !image || !price) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // If no cart exists, create a new cart
            cart = new Cart({
                userId,
                items: [
                    {
                        productId,
                        name,
                        image,
                        price,
                        quantity,
                    },
                ],
            });
        } else {
            // If cart exists, check if the product already exists in the cart
            const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (existingItemIndex > -1) {
                // Update the quantity if the product already exists
                cart.items[existingItemIndex].quantity += quantity;
            } else {
                cart.items.push({
                    productId,
                    name,
                    image,
                    price,
                    quantity,
                });
            }
        }

        cart.total = calculateTotal(cart);

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        console.error("Error adding item to cart:", err);
        res.status(500).json({ message: "An error occurred while adding item to cart" });
    }
});


// REMOVE FROM CART
router.delete('/remove/:userId/:productId', async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Recalculate total
        cart.total = await calculateTotal(cart);
        
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const calculateTotal = (cart) => {
    return cart.items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export default router;