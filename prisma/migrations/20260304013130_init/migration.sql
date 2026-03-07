/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoryContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contentgroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Contentprop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryContent" DROP CONSTRAINT "CategoryContent_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryContent" DROP CONSTRAINT "CategoryContent_contentId_fkey";

-- DropForeignKey
ALTER TABLE "Contentgroup" DROP CONSTRAINT "Contentgroup_contentId_fkey";

-- DropForeignKey
ALTER TABLE "Contentgroup" DROP CONSTRAINT "Contentgroup_propId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "CategoryContent";

-- DropTable
DROP TABLE "Content";

-- DropTable
DROP TABLE "Contentgroup";

-- DropTable
DROP TABLE "Contentprop";

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "red" SMALLINT NOT NULL DEFAULT 0,
    "green" SMALLINT NOT NULL DEFAULT 0,
    "blue" SMALLINT NOT NULL DEFAULT 0,
    "index" SERIAL NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "categoryId" UUID NOT NULL,
    "index" SERIAL NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contentprop" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "imgUrl" TEXT,
    "body" TEXT NOT NULL,
    "contentId" UUID NOT NULL,
    "index" SERIAL NOT NULL,

    CONSTRAINT "contentprop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "category_index_key" ON "category"("index");

-- CreateIndex
CREATE UNIQUE INDEX "content_categoryId_index_key" ON "content"("categoryId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "contentprop_contentId_index_key" ON "contentprop"("contentId", "index");

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contentprop" ADD CONSTRAINT "contentprop_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
