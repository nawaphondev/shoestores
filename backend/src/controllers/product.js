const db = require("../controllers/db");

// Get all products
const getAllProducts = async () => {
  return db.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      productImages: {
        take: 1,
        select: {
          file: true,
        }
      },
    }
  });
};

// Get a product by ID
const getProductById = async (id) => {
  return db.product.findUnique({
    where: {
      id,
    },
    include: {
      productImages: {
        select: {
          file: true
        }
      }
    }
  });
};

module.exports = {
  getAllProducts,
  getProductById,
};
