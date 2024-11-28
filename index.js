require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4000;
const userRouter = require("./routes/userRouter");

//middlewares
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Mb Events server" });
});
app.use("/api/v1", userRouter);

//error route
app.use((req, res) => {
  res.status(401).json({ success: false, message: "ROUTE NOT FOUND" });
});

//database connection
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "mbevent" });
    app.listen(PORT, () => {
      console.log(`server running on port:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
