import express from "express";
import { checkout, verify,userOrder, allOrders } from "../Controllers/payment.js";
import {Authenticated} from '../Middlewares/Auth.js'

const router = express.Router();

//ckeckout
router.post('/checkout',checkout);
//verify payment & save to db
router.post('/verify-payment',verify);
// order success
router.get('/userorder',Authenticated,userOrder)

// All orders
router.get('/orders',allOrders)


export default router