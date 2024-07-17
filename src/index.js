import express from "express";
import routes from "./Router/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://front-canchas-production.up.railway.app" , "http://localhost:5174", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
