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
    "imgUrl" TEXT,
    "index" SERIAL NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contentprop" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "imgUrl" TEXT,
    "body" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "youtubeEmbed" TEXT,
    "contentLinkId" UUID,
    "index" SERIAL NOT NULL,
    "contentId" UUID NOT NULL,

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
ALTER TABLE "contentprop" ADD CONSTRAINT "contentprop_contentLinkId_fkey" FOREIGN KEY ("contentLinkId") REFERENCES "content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contentprop" ADD CONSTRAINT "contentprop_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
