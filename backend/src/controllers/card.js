const db = require("../controllers/db");

// Create a new ship address
const createCard = async (data) => {
  return db.card.create({
    data,
  });
};

// Get all ship addresss
const getAllCards = async () => {
  return db.card.findMany();
};

// get all Cards by user id
const getAllCardsByUserId = async ({ userId }) => {
  return db.card.findMany({
    where: {
      userId,
    },
  });
};

// Get a ship address by ID
const getCardById = async (id) => {
  return db.card.findUnique({
    where: {
      id,
    },
  });
};

// Delete a ship address by ID
const deleteCardById = async ({ id }) => {
  return await db.card.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  deleteCardById,
  getAllCardsByUserId,
};
