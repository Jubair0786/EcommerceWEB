import { Address } from '../Models/Address.js';  // Adjust this path

export const addAddress = async (req, res) => {
    // Extract address details from request body
    let { fullName, address, city, state, country, pinCode, phoneNumber } = req.body;
    let userId = req.user; // Assuming req.user contains the user ID
    
    // Create a new address
    let userAddress = await Address.create({ userId, fullName, address, city, state, country, pinCode, phoneNumber });

    // Send success response
    res.json({ message: "Address added successfully", userAddress,success:true });
};

export const getAddresses = async (req, res) => {
    // Retrieve all addresses, sorted by creation date in descending order
    let addresses = await Address.find({ userId: req.user}).sort({ createdAt: -1 });

    // Send success response with the most recent address
    res.json({ message: "Addresses retrieved successfully", userAddress: addresses[0] });
};


        
   
    