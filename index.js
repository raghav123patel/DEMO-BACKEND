const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const authRoutes = require("./routes/userRoutes");
app.use("/api/v1/user", authRoutes);

const connectDB = require("./config/database");
connectDB();

app.listen(PORT, () => {  
    console.log(`server is listening at the ${PORT}`);
})


