const express = require("express");
const { connectDB } = require("./config/dbConn");
const app = express();

const dotenv = require("dotenv").config({ path: "./config.env" });
const Port = process.env.PORT;
const cookieParser = require("cookie-parser");
connectDB();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Home First page");
});

app.use("/user", require("./router/userRoute"));

app.use("/customer", require("./router/customerRoute"));

app.use("/desposition", require("./router/despositionRoute"));

app.use("/user", require("./router/confidential/loginRoute"));

app.listen(Port, () => {
  console.log("server is running on 8000");
});
