import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./common/routes";
import connectDB from "./config/database";

const app = express();

app.use(cors({ credentials: true }));

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", router);

const server = http.createServer(app);

server.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

connectDB();
