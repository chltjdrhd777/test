//? dependecies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const envEccess = process.env;

//? routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");

//! config ////////////////////////////
mongoose
  .connect(
    `mongodb://${envEccess.MONGO_USER}:${envEccess.MONGOOSE_PASSWORD}@mernproject-shard-00-00.f16wk.mongodb.net:27017,mernproject-shard-00-01.f16wk.mongodb.net:27017,mernproject-shard-00-02.f16wk.mongodb.net:27017/test?ssl=true&replicaSet=atlas-gdt69d-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.listen(envEccess.PORT, () =>
  console.log(`server is activated on ${envEccess.PORT}`)
);
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
//! ///////////////////////////
