import express from "express";
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from "./Routes/user.js"
import productRouter from "./Routes/product.js"
import cartRouter from "./Routes/cart.js"
import addressRouter from "./Routes/address.js"
import cors from "cors"; 
import paymentRouter from "./Routes/payment.js"



const app = express();

app.use(bodyParser.json())

app.use(cors({origin:true,methods:["GET","POST","PUT","DELETE"],credentials:true}))
app.get('/', (req, res) => 
    res.json({messge:'Hello World!'}))

    //user route

    app.use('/api/user',userRouter)

    // product route

    app.use('/api/product',productRouter)

    // cart route

    app.use('/api/cart',cartRouter)

    // address route

    app.use('/api/address',addressRouter)
    // payment route

    app.use('/api/payment',paymentRouter)
    

    
mongoose.connect("mongodb+srv://ansarijubair661:gtggdfislJEgYkC6@mohd.6vgqx.mongodb.net/",{
    dbName:"E-Commerce"
})
 .then(()=>
    console.log("***MongoDB connected successfully***")
 ).catch((err)=>console.log(err))
 const port = process.env.PORT || 5004;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
