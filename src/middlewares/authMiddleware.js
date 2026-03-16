// ############################################################
// AUTH MIDDLEWARE
// Middleware: حماية المسارات باستخدام JWT
// ############################################################

import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


// ############################################################
// PROTECT ROUTE
// حماية المسارات التي تحتاج تسجيل دخول
// ############################################################

export const protect = async (req, res, next) => {

  try {

    // ########################################################
    // قراءة Authorization Header
    // ########################################################
    const authHeader = req.headers.authorization;


    // ########################################################
    // التحقق أن التوكن موجود
    // ########################################################
    if (!authHeader || !authHeader.startsWith("Bearer ")) {

      return res.status(401).json({
        message: "No token provided"
      });

    }


    // ########################################################
    // استخراج التوكن
    // ########################################################
    const token = authHeader.split(" ")[1];


    // ########################################################
    // التحقق من التوكن باستخدام JWT
    // ########################################################
    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    // ########################################################
    // جلب المستخدم من قاعدة البيانات
    // ########################################################
    const user = await User.findById(decoded.id).select("-password");


    if (!user) {

      return res.status(401).json({
        message: "User not found"
      });

    }


    // ########################################################
    // إضافة المستخدم إلى الطلب
    // ########################################################
    req.user = user;


    next();

  } catch (error) {

    console.error("Auth error:", error);

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};



// ############################################################
// ADMIN CHECK
// Middleware: التحقق أن المستخدم Admin
// ############################################################

export const isAdmin = (req, res, next) => {

  if (!req.user) {

    return res.status(401).json({
      message: "Not authenticated"
    });

  }


  if (req.user.role !== "admin") {

    return res.status(403).json({
      message: "Admin access required"
    });

  }

  next();

};