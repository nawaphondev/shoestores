const db = require("../controllers/db");

// Create a new ship address
const createPayment = async (data) => {
  return db.payment.create({
    data,
  });
};

// Get all ship addresss
const getAllPayments = async () => {
  return db.payment.findMany();
};

// get all Paymentss by user id
const getAllPaymentsByUserId = async ({ userId }) => {
  console.log(userId)
  return db.payment.findMany({
    where: {
      userId,
    },
  });
};

// Get a ship address by ID
const getPaymentById = async (id) => {
  return db.payment.findUnique({
    where: {
      id,
    },
  });
};

// Update a ship address by ID
const updatePaymentById = async (id, data) => {
  return db.payment.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a ship address by ID
const deletePaymentById = async ({ id }) => {
  return await db.payment.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
  getAllPaymentsByUserId,
};
