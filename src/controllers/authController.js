// ###########################################################
// # IMPORT LIBRARIES & MODELS
// # استيراد المكتبات والموديلات
// ###########################################################

import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ###########################################################
// # GENERATE JWT TOKEN
// # إنشاء توكن تسجيل الدخول
// ###########################################################

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};


// ###########################################################
// # REGISTER USER FUNCTION
// # دالة إنشاء حساب جديد
// ###########################################################

export const register = async (req, res) => {

  // ###########################################################
  // # GET DATA FROM REQUEST
  // # جلب البيانات القادمة من الطلب
  // ###########################################################

  const { name, email, password, firebaseUid } = req.body;

  try {

    // ###########################################################
    // # CHECK IF USER ALREADY EXISTS
    // # التأكد إذا كان المستخدم موجود مسبقاً
    // ###########################################################

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }



    // ###########################################################
    // # HASH PASSWORD
    // # تشفير كلمة المرور
    // ###########################################################

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    // ###########################################################
    // # CREATE NEW USER IN DATABASE
    // # إنشاء المستخدم داخل قاعدة البيانات
    // ###########################################################

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      firebaseUid
    });



    // ###########################################################
    // # RETURN USER DATA + TOKEN
    // # إرسال بيانات المستخدم مع التوكن
    // ###########################################################

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user)
    });

  } catch (error) {

    // ###########################################################
    // # ERROR HANDLER
    // # معالجة الأخطاء
    // ###########################################################

    res.status(500).json({
      message: error.message
    });
  }
};



// ###########################################################
// # LOGIN USER FUNCTION
// # دالة تسجيل الدخول
// ###########################################################

export const login = async (req, res) => {

  // ###########################################################
  // # GET LOGIN DATA
  // # جلب بيانات تسجيل الدخول
  // ###########################################################

  const { email, password } = req.body;

  try {

    // ###########################################################
    // # FIND USER BY EMAIL
    // # البحث عن المستخدم عبر الإيميل
    // ###########################################################

    const user = await User.findOne({ email });

    // ###########################################################
    // # CHECK PASSWORD
    // # التحقق من كلمة المرور
    // ###########################################################

    if (user && (await bcrypt.compare(password, user.password))) {

      // ###########################################################
      // # RETURN USER DATA + TOKEN
      // # إعادة بيانات المستخدم والتوكن
      // ###########################################################

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user)
      });

    } else {

      // ###########################################################
      // # INVALID LOGIN
      // # بيانات تسجيل الدخول خاطئة
      // ###########################################################

      res.status(401).json({
  message: "Invalid email or password"
});

  }

} catch (error) {

  res.status(500).json({
    message: error.message
  });

}

};

export const getProfile = async (req, res) => {

  try {

    res.json({
      email: req.user.email,
      theme: req.user.theme,
      language: req.user.language,
      chatColor: req.user.chatColor,
      accentColor: req.user.accentColor
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to get profile"
    });

  }

};

export const updatePreferences = async (req, res) => {
console.log(req.body);
  try {

    const user = await User.findById(req.user.id);

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    user.theme = req.body.theme || user.theme;

    user.language = req.body.language || user.language;

    user.chatColor = req.body.chatColor || user.chatColor;

    user.accentColor = req.body.accentColor || user.accentColor;

    await user.save();

    res.json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};