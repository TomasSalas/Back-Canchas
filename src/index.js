import express from "express";
import routes from "./Router/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://front-canchas.vercel.app/",
    credentials: true,
  })
);
app.use(routes);
app.listen(3000);
