import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Zakat route working" });
});

export default router;