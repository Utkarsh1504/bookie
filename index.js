import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import dbConnection from "./db.js";
import authRouter from "./routes/authRouter.js";
import bookRouter from "./routes/bookRouter.js";

config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded("urlencoded", { extended: true }));

app.get("/", (req, res) => {
  res.send("server is runnning");
});
app.use("/api/auth", authRouter);
app.use("/api/book", bookRouter);

(async () => {
  await dbConnection();
  app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
  });
})();
