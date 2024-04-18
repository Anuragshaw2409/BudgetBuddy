import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
prisma.$connect()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });
export {prisma}