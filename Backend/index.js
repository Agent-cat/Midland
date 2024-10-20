const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const connectDB = require("./Database/db.js");
const propertyRoutes = require("./Routes/property.routes.js");
const authRoutes = require("./Routes/auth.routes.js");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
