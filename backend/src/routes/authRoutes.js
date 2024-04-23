const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const authenticate = require("../middlewares/authenticate");
const db = require("../controllers/db");
const { createCart } = require("../controllers/cart");
const router = express.Router();

const {
  createUser,
  getUserByUsername,
  updateUserById,
} = require("../controllers/user");

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

router.post("/register", upload, async (req, res, next) => {
  const data = req.body;

  try {
    if (!(data.username && data.password && data.confirmPassword)) {
      return next(new Error("Fulfill all inputs"));
    }
    if (data.confirmPassword !== data.password) {
      throw new Error("Confirm Password is not match");
    }

    const hashedPassword = await bcrypt.hash(data.password, 8);


    console.log(data)

    const rs = await createUser({ ...data, password: hashedPassword, avatar: req.file.filename, confirmPassword: undefined });
    await createCart({ userId: rs.id });

    res.json({ msg: "Register successful" });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!(username.trim() && password.trim())) {
      throw new Error("username or password must not blank");
    }

    const user = await getUserByUsername(username);

    const pwOk = await bcrypt.compare(password, user.password);
    if (!pwOk) {
      throw new Error("invalid password");
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.json({ token: token });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/me", authenticate, (req, res, next) => {
  res.json(req.user);
});

router.post("/changePassword", authenticate, async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword, id } = req.body;

  try {
    if (!(currentPassword && newPassword && confirmPassword)) {
      throw new Error("fulfill all inputs");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("confirm password not match");
    }

    const user = await db.user.findUniqueOrThrow({
      where: {
        id,
      },
      select: {
        password: true,
      },
    });

    const pwOk = await bcrypt.compare(currentPassword, user.password);
    if (!pwOk) {
      throw new Error("invalid password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);
    await updateUserById({ id, password: hashedPassword });

    res.json({ msg: "Password Changed" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
