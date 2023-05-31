import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "@/config";
import { authRouter } from "./routers/auth-router";
import { enrollmentRouter } from "./routers/enrollment-router";

loadEnv();


const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", authRouter)
  .use("/enrollment", enrollmentRouter)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
