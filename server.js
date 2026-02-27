import express from "express";
import cors from "cors";

import { env } from "./config/env.js";
import { verifyFirebaseToken } from "./middlewares/authMiddleware.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import { userRoutes } from "./routes/userRoutes.js";
import { chatRoutes } from "./routes/chatRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { stripeRoutes } from "./routes/stripeRoutes.js";
import { zakatRoutes } from "./routes/zakatRoutes.js";
import { startReminderScheduler } from "./services/schedulerService.js";

startReminderScheduler();

app.use("/api/zakat", zakatRoutes);

const app = express();

// 1) Stripe webhook RAW لازم يكون قبل express.json
app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  (req, res, next) => {
    // تحويل للراوتر (لأن الراوتر مسجل نفس المسار)
    next();
  }
);

// 2) باقي الميدل وير
app.use(cors());

// ⚠️ مهم: json بعد webhook raw
app.use(express.json());

// 3) Auth decode (يسمح يكون token فاضي)
app.use(verifyFirebaseToken);

// 4) Routes
app.get("/health", (req, res) => {
  res.json({ ok: true, name: "BlueMind.AI", time: new Date().toISOString() });
});

app.use(userRoutes);
app.use(chatRoutes);
app.use(adminRoutes);

// راوتر Stripe (فيه /stripe/webhook + /stripe/create-checkout-session)
app.use(stripeRoutes);

// 5) Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 BlueMind.AI server running on port ${PORT}`);
});
 