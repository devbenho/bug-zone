import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import "reflect-metadata";
import { container } from "./utils/ioc/inversify.config";
import { errorHandlerMiddleware } from "./api/rest/middlewares/error.mw";
import ApplicationRouter from "./routes";
import { LOGGER } from "./utils/logger";
import appDataSource from "./api/rest/database/data-source";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// initialize the database.

appDataSource
  .initialize()
  .then(() => {
    LOGGER.info("Database is connected");
  })
  .catch((err) => {
    LOGGER.error("Database connection failed", err);
  });

app.use(morgan("dev"));
const PORT = process.env.PORT || 3004;
// Check ENDPOINT;
app.get("/healthZ", (_req, res) => {
  return res.status(200).json({ message: "OK" });
});
app.get("/users", async (_req, res) => {});
// load all configs
const router = container.get<ApplicationRouter>(ApplicationRouter);
router.register(app);
// error middleware.
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  LOGGER.info(`Application is running on port ${PORT} 🚀`);
  LOGGER.info(`Environment: ${process.env.NODE_ENV}`);
});
