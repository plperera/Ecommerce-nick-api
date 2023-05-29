import * as jwt from "jsonwebtoken";

import { prisma } from "@/config";
import userFactory from "./factories/user-factory";

export async function cleanDb() {

  await prisma.productImage.deleteMany({})
  await prisma.productCategory.deleteMany({})
  await prisma.category.deleteMany({})
  await prisma.image.deleteMany({})
  await prisma.session.deleteMany({})
  await prisma.user.deleteMany({})

}

export async function generateValidToken() {
  /*
  const body = authFactory.generateValidBody()
  const user = await userFactory.createUser(body)

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  const session = userFactory.createSession({token, userId:user.id})

  return token;
  */
}