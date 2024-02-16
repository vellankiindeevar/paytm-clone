const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRETS } = require("../config");
const { User, Account } = require("../db");
const zod = require("zod");
const router = express.Router();

const { authMiddleware } = require('../middleware')

const signupBody = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupBody.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrect input",
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already taken / Incorrect input",
    });
  }

  const user = await User.create({
    username: body.username,
    password: body.password,
    firstName: body.firstName,
    lastName: body.lastName,
  });

  const userId = user._id;

  // balances initialiazation 
  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000
  })


  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRETS
  );

  return res.status(200).json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinBody.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const user = User.findOne({
    username: body.username,
    password: body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRETS);
    return res.status(200).json({ token: token });
  }

  return res.status(411).json({
    message: "Error while logging in",
  });
});


const userInput = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})



router.put('/',authMiddleware, async (req, res) => {
  const { success } = userInput.safeParse(req.body)
  if (!success) {
    res.status(411).json({
      message: "Error while updating information"
    })
  }

  await User.updateOne(req.body, {
    _id: req.userId
  })

  res.json({
    message: "Updated successfully"
  })

})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
