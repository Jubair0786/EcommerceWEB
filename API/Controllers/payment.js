import {Payment} from "../Models/Payment.js"
import Razorpay from 'razorpay'



const razorpay = new Razorpay({
    key_id: 'rzp_test_DWYpvmocq5ZzsL',
    key_secret: 'eZosrNDpna5XiwewM8YAJIGc'
})

// checkout
export const checkout = async (req, res) => {
    const {amount,cartItems,userShipping,userId} = req.body
    var options = {
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_${Date.now()}",
        
    }
    const order = await razorpay.orders.create(options)
    res.json({orderId: order.id,amount:amount,cartItems,userShipping,userId,payStatus:"Created"})
}
// Payment verification
export const verify = async (req, res) => {
    const {orderId, paymentId, signature, amount,orderItems, userShipping, userId} = req.body

    let orderConfirm = await Payment.create({
        orderId,
        paymentId,
        signature,
        amount,
        orderItems,
        userId,
        userShipping,
        payStatus:"paid",
    })
    res.json({message:"Payment Successful...", success:true, orderConfirm})

};
// payment status
export const userOrder = async (req, res) => {
    let userId = req.user._id.toString();
    let orders = await Payment.find({ userId: userId }).sort({orderDate:-1})
    res.json({orders})
}
//

export const allOrders = async (req, res) => {

    let orders = await Payment.find().sort({orderDate:-1})
    res.json({orders})
}