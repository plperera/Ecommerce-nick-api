import { loadEnv, connectDb, disconnectDB } from "@/config";
import cors from "cors";
import express, { Express } from "express";
import "reflect-metadata";
import "express-async-errors";

loadEnv();

import { enrollmentRouter } from "./routers/enrollment-router";
import { addressRouter } from "./routers/address-router";
import { authRouter } from "./routers/auth/auth-router";
import { adminAuthRouter } from "./routers/auth/adminAuth-router";
import { shippingRouter } from "./routers/shipping-router";
import { categoryRouter } from "./routers/category-router";
import { productRouter } from "./routers/product-router";
import { imageRouter } from "./routers/image-router";
import { orderRouter } from "./routers/order-router";
import { paymentRouter } from "./routers/payment-router";
import { homePageRouter } from "./routers/homepage-router";
import { favoriteRouter } from "./routers/favorite-router";
import { subCategoryRouter } from "./routers/sub-category-router";


const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/auth", authRouter)
  .use("/admin", adminAuthRouter)
  .use("/enrollment", enrollmentRouter)
  .use("/address", addressRouter)
  .use("/shipping", shippingRouter)
  .use("/category", categoryRouter)
  .use("/product", productRouter)
  .use("/payment", paymentRouter)
  .use("/image", imageRouter)
  .use("/order", orderRouter)
  .use("/homepage", homePageRouter)
  .use("/favorite", favoriteRouter)
  .use("/subcategory", subCategoryRouter)

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
