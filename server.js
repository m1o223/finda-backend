// server.js

import "dotenv/config"

import express from "express"
import cors from "cors"
import mongoose from "mongoose"

console.log("JWT_SECRET:", process.env.JWT_SECRET)

import { startReminderScheduler } from "./src/services/reminderScheduler.js"


// =========================
// Routes
// =========================

import authRoutes from "./src/routes/authRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import chatRoutes from "./src/routes/chatRoutes.js"
import reminderRoutes from "./src/routes/reminderRoutes.js"
import aiRoutes from "./src/routes/aiRoutes.js"


// =========================
// App
// =========================

const app = express()


// =========================
// Middlewares
// =========================

app.use(cors())
app.use(express.json())


// =========================
// Routes
// =========================

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/reminders", reminderRoutes)
app.use("/api/ai", aiRoutes)


// =========================
// MongoDB Connection
// =========================

mongoose
.connect(process.env.MONGO_URI)
.then(() => {

    console.log("✅ MongoDB connected")

    startReminderScheduler()

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`)
    })

})
.catch((err) => {

    console.error("❌ MongoDB connection error:", err)

})