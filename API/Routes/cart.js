import express from "express";
import { addToCart, userCart, removeProductFromCart, clearCart, decreaseProductQty } from "../Controllers/cart.js";
import { Authenticated } from '../Middlewares/Auth.js';

const router = express.Router();
// Add to cart
router.post('/add',Authenticated,addToCart)
// get cart
router.get('/user',Authenticated,userCart)
//remove product from cart
router.delete('/remove/:productId',Authenticated,removeProductFromCart)
//clear cart
router.delete('/clear',Authenticated,clearCart)
//decrease items qty
router.post('/--qty',Authenticated,decreaseProductQty)







export default router