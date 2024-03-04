import "reflect-metadata";
import express from "express";
import morgan from "morgan";
import { container } from "./ioc/inversify.config";
import ApplicationRouter from "./routes";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Check ENDPOINT;
app.get("/healthZ", (req, res) => {
  res.send("Hello World");
});
const router = container.get<ApplicationRouter>(ApplicationRouter);
router.register(app);

app.listen(3004, () => {
  console.log("Server is running on port 3004");
});
