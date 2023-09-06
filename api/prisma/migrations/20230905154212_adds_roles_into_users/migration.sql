-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('USER', 'ADMIN', 'SUPER_ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'USER';
