import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 9999;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credential: true,
  })
);

app.use(cookieParser());

app.use(express.json({ limit: "16kb" }));

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/v1/", (req, res) => {
  res.send("Server Is working Fine on th codem");
});


//Routes
import userRouter from "./routes/user.js";
app.use('/api/v1/user',userRouter)

import itrFilling from './routes/incometax-filling.js';
app.use('/api/v1/itf',itrFilling)

import itrRegistration from './routes/incometax-registration.js';
app.use('/api/v1/itr',itrRegistration)

import gstRegistration from './routes/gst-registration.js';
app.use('/api/v1/gstr',gstRegistration)

import gstFiling from './routes/gst-filling.js';
app.use('/api/v1/gstf',gstFiling)

import cart from './routes/cart.js';
app.use('/api/v1/cart',cart)

import checkout from './routes/billing-detail.js';
app.use('/api/v1/billing',checkout)

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});


export {app};