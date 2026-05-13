import mongoose from "mongoose"

const reminderSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

title: {
  type: String,
  required: true
},

description: {
  type: String
},

  date: {
    type: Date,
    required: true
  },

  time: {
    hour: {
      type: Number
    },
    minute: {
      type: Number
    }
  },

remindBefore: {
  type: Number,
  enum: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
  default: 5
},

  recurring: {
    type: String,
    enum: ["daily", "weekly", "monthly", null],
    default: null
  },

  sent: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
})

export default mongoose.model("Reminder", reminderSchema)