import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "@/config";
import { enrollmentRouter } from "./routers/enrollment-router";
import { addressRouter } from "./routers/address-router";
import { authRouter } from "./routers/auth/auth-router";
import { adminAuthRouter } from "./routers/auth/adminAuth-router";

loadEnv();


const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", authRouter)
  .use("/admin", adminAuthRouter)
  .use("/enrollment", enrollmentRouter)
  .use("/address", addressRouter)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
