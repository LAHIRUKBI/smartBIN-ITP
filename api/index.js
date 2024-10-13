import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import listingRouter from "./routes/Stocklisting.route.js";
import requestServiceRoute from "./routes/Requestservice.route.js";
import orderRouter from "./routes/order.route.js";
import send_order_Router from "./routes/Stocks_Send_Route.js";
import shippingRoutes from "./routes/Shipping.Route.js";
import ComplainRouter from "./routes/ComplainRoute.js";
import vehicleRoutes from "./routes/vehicles.js";
import routeRouting from "./routes/routs.js";
import vehicleOrderRoutes from "./routes/Vehicles.orders.Route.js";

import productRouter from "./routes/Product.route.js";
import productorderRouter from "./routes/Order_payment.route.js";


dotenv.config();


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongo DataBase");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRouter);
app.use("/api/requestservice", requestServiceRoute);
app.use("/api/order", orderRouter);

app.use("/api/order", send_order_Router);
app.use("/api/ship", shippingRoutes);
app.use("/api/complain", ComplainRouter);

app.use("/api/vehicles", vehicleRoutes);
app.use("/api/routes", routeRouting);
app.use("/api/vehicleorders", vehicleOrderRoutes);

app.use("/api/product", productRouter);
app.use("/api/productorder", productorderRouter);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
