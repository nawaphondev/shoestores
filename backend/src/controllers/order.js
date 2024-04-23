const db = require("../controllers/db");

// Create a new order
const createOrder = async (data) => {
  return await db.order.create({
    data,
  });
};

const createOrderDetail = async (data) => {
  return await db.orderDetail.create({
    data,
  });
};

//create many order detail
const createManyOrderDetail = async (data) => {
  return await db.orderDetail.createMany({
    data,
    skipDuplicates: true,
  });
};

// Get all orders
const getAllOrders = async () => {
  return db.order.findMany({
    include: {
      orderDetails: {
        include: {
          product: true,
        },
      },
      payment: true,
      shippingAddress: true,
      user: {
        select: {
          avatar: true,
          email: true,
          firstName: true,
          lastName: true,
          phoneNumber: true,
          username: true,
        },
      },
    },
  });
};

// Get a order by ID
const getOrderById = async (id) => {
  return db.order.findUnique({
    where: {
      id,
    },
    include: {
      orderDetails: {
        select: {
          price: true,
          quantity: true,
          size: true,
          product: {
            select: {
              name: true,
              productImages: {
                take: 1,
                select: {
                  file: true,
                }
              }
            }
          }
        }
      },
    },
  });
};

// Update a order by ID
const updateOrderById = async (id, data) => {
  return db.order.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a order by ID
const deleteOrderById = async (id) => {
  return db.order.delete({
    where: {
      id,
    },
  });
};

// get all orders from user
const getOrdersByUserId = async (userId) => {
  return db.order.findMany({
    where: {
      userId,
    },
    include: {
      orderDetails: true,
    },
  });
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  createOrderDetail,
  getOrdersByUserId,
  createManyOrderDetail,
};
