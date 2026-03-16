import express from "express"
import User from "../../models/userModel.js"

const router = express.Router()

router.post("/save-token", async (req, res) => {

  try {

    const { userId, token } = req.body

    await User.findByIdAndUpdate(userId, {
      fcmToken: token
    })

    res.json({ message: "Token saved" })

  } catch (error) {

    res.status(500).json({ error: "Token save error" })

  }

})

export default router