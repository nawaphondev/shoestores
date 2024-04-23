// cart.routes.js
const express = require("express");
const router = express.Router();
const cartService = require("../controllers/cart");

// Create a new cart
router.post("/create", async (req, res) => {
  try {
    const newCart = await cartService.createCart(req.body);
    res.json(newCart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating cart", message: error.message });
  }
});

// Get all carts
router.get("/all", async (req, res) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: "Error getting carts" });
  }
});

// Get a cart by ID
router.get("/get/:id", async (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  try {
    const cart = await cartService.getCartById(cartId);

    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: "Error getting cart" });
  }
});

// add item to a cart
router.post("/add", async (req, res) => {
  try {
    const cartItem = await cartService.addCartItemByCartId(req.body);
    res.json(cartItem);
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ error: "Error adding item to cart", message: error.message });
  }
});

// remove item from a cart
router.delete("/remove", async (req, res) => {
  // console.log(req.body);
  try {
    const removedCartItem = await cartService.removeShoppingCartItem(req.body);

    if (!removedCartItem) {
      res.status(404).json({ error: "Cart item not found" });
      return;
    }

    res.json(removedCartItem);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error removing item from cart", message: error.message });
  }
});

// Update a cart by ID
router.put("/update/:id", async (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  try {
    const updatedCart = await cartService.updateCartById(cartId, req.body);

    if (!updatedCart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: "Error updating cart" });
  }
});

// Delete a cart by ID
router.delete("/delete/:id", async (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  try {
    const deletedCart = await cartService.deleteCartById(cartId);

    if (!deletedCart) {
      res.status(404).json({ error: "Cart not found" });
      return;
    }

    res.json(deletedCart);
  } catch (error) {
    res.status(500).json({ error: "Error deleting cart" });
  }
});

module.exports = router;
