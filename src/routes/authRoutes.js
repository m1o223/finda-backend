// ###########################################################
// # IMPORT EXPRESS
// # استيراد مكتبة Express لإنشاء الراوتر
// ###########################################################

import express from "express";


// ###########################################################
// # IMPORT AUTH CONTROLLER FUNCTIONS
// # استيراد دوال تسجيل الحساب وتسجيل الدخول
// ###########################################################

import {
  register,
  login,
  getProfile,
  updatePreferences
} from "../controllers/authController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
// ###########################################################
// # CREATE ROUTER
// # إنشاء Router جديد من Express
// ###########################################################

const router = express.Router();


// ###########################################################
// # REGISTER ROUTE
// # مسار إنشاء حساب جديد
// ###########################################################
// API:
// POST /api/auth/register
// ###########################################################

router.post("/register", register);



// ###########################################################
// # LOGIN ROUTE
// # مسار تسجيل الدخول
// ###########################################################
// API:
// POST /api/auth/login
// ###########################################################

router.post("/login", login);



// ###########################################################
// # EXPORT ROUTER
// # تصدير الراوتر ليتم استخدامه في server.js
// ###########################################################
router.get("/me", authMiddleware, getProfile);
router.put(
  "/preferences",
  authMiddleware,
  updatePreferences
);
export default router;