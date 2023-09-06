/*
  Warnings:

  - You are about to drop the column `state` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "state",
ADD COLUMN     "status" "TaskState" NOT NULL DEFAULT 'PENDING';
