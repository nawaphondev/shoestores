// user.routes.js
const express = require("express");
const router = express.Router();
const userService = require("../controllers/user");
const authenticate = require("../middlewares/authenticate");
const bcrypt = require("bcrypt");

const mapUserType = (userTypeString) => {
  // Assuming you have a map of string values to enum values
  const userTypeMap = {
    customer: "CUSTOMER",
    admin: "ADMIN",
  };

  // Default to 'CUSTOMER' if not found
  return userTypeMap[userTypeString] || "CUSTOMER";
};

router.post('/forget', async (req, res) => {
  try {
    const user = await userService.getUserByUsername(req.body.username)
    if (user.secretAnswer === req.body.secretAnswer && user.secretQuestion === req.body.secretQuestion) {
  
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 8);
      const updatedUser = await userService.updateUserById({id:user.id, password: hashedPassword });
      res.status(200).json()
    } else {
      res.status(412).json()
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting user", message: error.message });
    
  }
})

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const userTypeEnum = mapUserType(data.userType);
    const body_data = req.body;
    body_data.userType = userTypeEnum;
    const newUser = await userService.createUser(body_data);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting users" });
  }
});

//get all admins
router.get("/admins", async (req, res) => {
  try {
    const users = await userService.getAllAdmins();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error getting Admins" });
  }
});

// Get a user by ID
router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const user = await userService.getUserById(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting user" });
  }
});

const multer = require("multer");
const path = require("path");
// Set up multer for handling file uploadsconst path = require("path");

function createFilename(req, file) {
  console.log(req.body)
  fileExtension = path.extname(file.originalname)
  return `${req.body.username}${fileExtension}`
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/avatar/')
  },
  filename: function (req, file, cb) {
    cb(null, createFilename(req, file))
  }
})
const upload = multer({ storage }).single('avatar')

router.put("/changeAvatar", authenticate, upload, async (req, res) => {
  try {
    const updatedUser = await userService.updateUserById({id: parseInt(req.body.id), avatar: req.file.filename })
    res.json(updatedUser)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: "Error updating user", message: error.message });
  }
})

// Update a user by ID
router.put("/update", authenticate, async (req, res) => {
  // console.log(req.body)
  // if (req.file != undefined) {
  //   req.body.avatar = createFilename(req, req.file)
  // }

  try {
    const updatedUser = await userService.updateUserById(req.body);

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    console.log(updatedUser)

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete a user by ID
router.delete("/delete/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  try {
    const deletedUser = await userService.deleteUserById(userId);

    if (!deletedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

module.exports = router;
