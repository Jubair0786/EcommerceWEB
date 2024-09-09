import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pinCode: { type: String, required: true }, // Ensure the field name matches exactly
    phoneNumber: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });
  
  

export const Address = mongoose.model('Address', addressSchema);  // Use addressSchema here
