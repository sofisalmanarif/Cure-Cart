import express from "express";
import cors from "cors";
import { connectDb } from "./database.js";
import cookieParser from "cookie-parser";
import nodeCache from "node-cache";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/Error.js";
import Stripe from "stripe"

// importing routes
import userRoutes from "./routes/User.js";
import productRoutes from "./routes/Product.js";
import orderRoutes from "./routes/Order.js";
import PresciptionOrderRoutes from "./routes/PresciptionOrder.js";
import dashboardRoutes from "./routes/Dashboard.js";
import paymentRoutes from "./routes/Payments.js";
config({ path: ".env" });
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONG0_URI ;
const stripeKey = process.env.STRIPE_KEY ;
// console.log(stripeKEY)

connectDb(mongoURI);
export const stripe =new Stripe(stripeKey)
export const myCache = new nodeCache();
import morgan from "morgan";

const app = express();

// middlewares
const allowedOrigins = ['http://localhost:5173', 'https://curecart.vercel.app']; //  allowed origins here


app.use(cors({ 
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
}));


app.use(morgan('combined')); 
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    parameterLimit:10000,
    limit:"2mb"
  })
);


// using routes
app.get("/api/v1/health",(req,res)=>{
  console.log("health cheack endpoint hitted")
  res.status(200).json({msg:"i am healthy"})
})


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/presciption-Order", PresciptionOrderRoutes);
app.use("/api/v1/payment", paymentRoutes);

//Error Handler
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
