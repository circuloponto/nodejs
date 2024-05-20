

const express = require("express");
const { connectDb } = require("./db/db");
const authRouter = require("./routes/user.routes");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http").Server(app);
const { upload, gfs } = require('./config/gridfs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
const port = 5000;
connectDb();
app.use("/api", authRouter);

http.listen(port, () => {
  console.log("server is running on port: ", port);
});

//mongodb+srv://<username>:<password>@cluster0.ntexneq.mongodb.net/
