const db = require("../controllers/db");

// Create a new ship address
const createOrEditShipAddress = async (data) => {
  return db.shippingAddress.upsert({
    where: {
      id: data.id || 0,
    },
    update: data,
    create: data,
  });
};

// Get all ship addresss
const getAllShipAddresss = async () => {
  return db.shippingAddress.findMany();
};

// get all shipAddresss by user id
const getAllShipAddresssByUserId = async ({ userId }) => {
  return db.shippingAddress.findMany({
    where: {
      userId,
    },
  });
};

// Get a ship address by ID
const getShipAddressById = async (id) => {
  return db.shippingAddress.findUnique({
    where: {
      id,
    },
  });
};

// Update a ship address by ID
const updateShipAddressById = async (id, data) => {
  return db.shippingAddress.update({
    where: {
      id,
    },
    data,
  });
};

// Delete a ship address by ID
const deleteShipAddressById = async ({ id }) => {
  return await db.shippingAddress.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createOrEditShipAddress,
  getAllShipAddresss,
  getShipAddressById,
  updateShipAddressById,
  deleteShipAddressById,
  getAllShipAddresssByUserId,
};
