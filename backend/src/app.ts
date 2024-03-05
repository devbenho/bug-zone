import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { container } from "./ioc/inversify.config";
import { errorHandlerMiddleware } from "./middlewares/error.mw";
import ApplicationRouter from "./routes";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
const PORT = process.env.PORT || 3004;
// Check ENDPOINT;
app.get("/healthZ", (req, res) => {
  res.send("Hello World");
});

const router = container.get<ApplicationRouter>(ApplicationRouter);
router.register(app);
// error middleware
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  console.log(`${process.env.NODE_ENV} ENV ⚒️`);
  console.log(`Application is running on port ${PORT} 🚀`);
});
