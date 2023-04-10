import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  stock:{
    type: Number,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  thumbanail:{
    type: String,
  },
})

export const productsModel = mongoose.model('Products', productsSchema)