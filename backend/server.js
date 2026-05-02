const express = require("express");
const cors = require("cors");
const db=require("./db");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);

const PORT= 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});