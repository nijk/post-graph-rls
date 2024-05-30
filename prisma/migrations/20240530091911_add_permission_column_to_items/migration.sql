-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('FREE', 'PAID');

-- AlterTable
ALTER TABLE "items" ADD COLUMN     "permission" "Permission" NOT NULL DEFAULT 'FREE';

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
