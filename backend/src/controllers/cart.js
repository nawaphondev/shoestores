const db = require("../controllers/db");

// Create a new cart
const createCart = async (data) => {
  return await db.shoppingCart.create({
    data,
  });
};

// Get all carts
const getAllCarts = async () => {
  return db.shoppingCart.findMany();
};

// Get a cart by ID
const getCartById = async (id) => {
  return db.shoppingCart.findUnique({
    where: {
      id,
    },
    select: {
      shoppingCartItems: {
        select: {
          quantity: true,
          size: true,
          product: {
            select: {
              id: true,
              name: true,
              price: true,
              productImages: {
                take: 1,
                select: {
                  file: true,
                }
              }
            },
          },
        },
      },
    },
  });
};

const getCartByUserId = async (userId) => {
  const shoppingCart = await db.shoppingCart.findFirst({
    where: {
      userId: userId,
    },
  });
  return shoppingCart;
};

// Update a cart by ID
const updateCartById = async (id, data) => {
  return db.shoppingCart.update({
    where: {
      id,
    },
    data,
  });
};

const addCartItemByCartId = async (data) => {
  const { productId, shoppingCartId, quantity, size } = data;
  const item = await db.shoppingCartItem.upsert({
    where: {
      productId_shoppingCartId_size: { productId, shoppingCartId, size },
    },
    update: {
      quantity: {
        increment: quantity,
      },
    },
    create: data,
  });
  return item;
};

//removeShoppingCartItem
const removeShoppingCartItem = async (data) => {
  const { productId, shoppingCartId, size } = data;
  return await db.shoppingCartItem.delete({
    where: {
      productId_shoppingCartId_size: { productId, shoppingCartId, size },
    },
  });
};

const removeShoppingCartItems = async (shoppingCartId, productId, size) => {
  return await db.shoppingCartItem.deleteMany({
    where: {
      shoppingCartId: {
        equals: shoppingCartId,
      },
      productId: {
        in: productId,
      },
      size: {
        in: size
      },
    },
  });
};

db.shoppingCartItem.deleteMany;

// Delete a cart by ID
const deleteCartById = async (id) => {
  return db.shoppingCart.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createCart,
  getAllCarts,
  getCartById,
  updateCartById,
  deleteCartById,
  getCartByUserId,
  addCartItemByCartId,
  removeShoppingCartItem,
  removeShoppingCartItems,
};
