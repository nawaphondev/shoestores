const db = require("../controllers/db");

// Create a new user
const createUser = async (data) => {
  return db.user.create({
    data,
  });
};

// Get all users
const getAllUsers = async () => {
  return db.user.findMany({
    where: {
      userType: "CUSTOMER",
    },
  });
};

// Get all admins
const getAllAdmins = async () => {
  return db.user.findMany({
    where: {
      userType: "ADMIN",
    },
  });
};

// Get a user by ID
const getUserById = async (id) => {
  return db.user.findUnique({
    where: {
      id,
    },
    select: {
      avatar: true,
      email: true,
      firstName: true,
      phoneNumber: true,
      username: true,
    },
  });
};

// Get a user by username
const getUserByUsername = async (username) => {
  return await db.user.findUnique({
    where: {
      username,
    },
  });
};

// Update a user by ID
const updateUserById = async (data) => {
  // console.log(data)
  return await db.user.update({
    where: {
      id: data.id
    },
    data,
  });
};

// Delete a user by ID
const deleteUserById = async (id) => {
  return db.user.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByUsername,
  getAllAdmins
};
