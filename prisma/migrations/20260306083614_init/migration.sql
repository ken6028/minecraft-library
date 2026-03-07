/*
  Warnings:

  - Made the column `title` on table `contentprop` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "contentprop" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "title" SET DEFAULT '';
