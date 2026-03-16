import mongoose from "mongoose"

const profileSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  studyField: String,

  goals: [String],

  weakSubjects: [String],

  language: {
    type: String,
    default: "en"
  },

  lastInteraction: Date

})

export default mongoose.model("UserAIProfile", profileSchema)