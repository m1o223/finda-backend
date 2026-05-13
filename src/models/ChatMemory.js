import mongoose from "mongoose";

const chatMemorySchema = new mongoose.Schema({

  userId: {

    type: mongoose.Schema.Types.ObjectId,

    ref: "User"

  },

  title: {

    type: String,

    default: "New Chat"

  },

  messages: [

    {

      role: {

        type: String,

        enum: ["user", "assistant"]

      },

      content: {

        type: String,

        required: true

      }

    }

  ],

  createdAt: {

    type: Date,

    default: Date.now

  } 

});

export default mongoose.model("ChatMemory", chatMemorySchema);