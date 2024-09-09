import express from "express";
import { addAddress, getAddresses } from "../Controllers/address.js";
import { Authenticated } from "../Middlewares/Auth.js";

const router = express.Router();
// Add address

router.post('/add',Authenticated,addAddress)
// get address
router.get('/get',Authenticated,getAddresses)

export default router;