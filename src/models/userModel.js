import mongoose from "mongoose"

// ================================
// USER SCHEMA
// ================================

const userSchema = new mongoose.Schema(

  {

    // ================================
    // NAME
    // ================================

    name: {
      type: String,
      required: true,
      trim: true
    },

    // ================================
    // EMAIL
    // ================================

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    // ================================
    // PASSWORD
    // ================================

    password: {
      type: String,
      default: ""
    },

    // ================================
    // FIREBASE UID
    // ================================

    firebaseUid: {
      type: String,
      default: null
    },

    // ================================
    // ROLE
    // ================================

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },

    // ================================
    // FCM TOKEN
    // ================================

    fcmToken: {
      type: String,
      default: null
    },

    // ================================
    // APP THEME
    // ================================

    theme: {
      type: String,
      default: "light"
    },

    // ================================
    // LANGUAGE
    // ================================

    language: {
      type: String,
      default: "en"
    },

    // ================================
    // CHAT COLOR
    // ================================

    chatColor: {
      type: String,
      default: "#193B68"
    },

    // ================================
    // APP ACCENT COLOR
    // ================================

    accentColor: {
      type: String,
      default: "#193B68"
    }

  },

  {
    timestamps: true
  }

)

// ================================
// EXPORT MODEL
// ================================

const User = mongoose.model("User", userSchema)

export default User