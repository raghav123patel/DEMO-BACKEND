const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "*"
}));
app.use(express.json()); 

const authRoute = require("./routes/authRoutes");
app.use("/api/v1/auth", authRoute);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/v1/admin", adminRoutes);
const userRoute = require("./routes/userRoutes");
app.use("/api/v1/user", userRoute);
const collectionRoute = require("./routes/collectionRoutes");
app.use("/api/v1/collection", collectionRoute);
const componentRoute = require("./routes/componentRoutes");
app.use("/api/v1/component", componentRoute);
const connectDB = require("./config/database");
connectDB();

app.listen(PORT, () => {
  console.log(`server is listening at the ${PORT}`);
});
