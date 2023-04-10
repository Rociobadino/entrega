import mongoose from "mongoose";


const massagesSchema = new mongoose.Schema ({
    user:{
        type: String,
        // unique: true,
        required: true,
    },
    messages:{
        type: String,
        required: true,
    }
})

export const messagesModel = mongoose.model("Messages", massagesSchema)