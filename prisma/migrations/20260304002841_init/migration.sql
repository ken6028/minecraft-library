-- CreateTable
CREATE TABLE "Category" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "index" SERIAL NOT NULL,
    "red" SMALLINT NOT NULL DEFAULT 0,
    "green" SMALLINT NOT NULL DEFAULT 0,
    "blue" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryContent" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "index" SERIAL NOT NULL,
    "categoryId" UUID NOT NULL,
    "contentId" UUID NOT NULL,

    CONSTRAINT "CategoryContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "index" SERIAL NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contentgroup" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "index" SERIAL NOT NULL,
    "contentId" UUID NOT NULL,
    "propId" UUID NOT NULL,

    CONSTRAINT "Contentgroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contentprop" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "imgUrl" TEXT,
    "body" TEXT NOT NULL,

    CONSTRAINT "Contentprop_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_index_key" ON "Category"("index");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryContent_index_key" ON "CategoryContent"("index");

-- CreateIndex
CREATE UNIQUE INDEX "CategoryContent_categoryId_contentId_index_key" ON "CategoryContent"("categoryId", "contentId", "index");

-- CreateIndex
CREATE UNIQUE INDEX "Content_index_key" ON "Content"("index");

-- CreateIndex
CREATE UNIQUE INDEX "Contentgroup_index_key" ON "Contentgroup"("index");

-- CreateIndex
CREATE UNIQUE INDEX "Contentgroup_contentId_propId_index_key" ON "Contentgroup"("contentId", "propId", "index");

-- AddForeignKey
ALTER TABLE "CategoryContent" ADD CONSTRAINT "CategoryContent_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryContent" ADD CONSTRAINT "CategoryContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contentgroup" ADD CONSTRAINT "Contentgroup_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contentgroup" ADD CONSTRAINT "Contentgroup_propId_fkey" FOREIGN KEY ("propId") REFERENCES "Contentprop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
