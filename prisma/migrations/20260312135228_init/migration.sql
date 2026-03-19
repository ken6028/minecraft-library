-- CreateTable
CREATE TABLE "BookCategory" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BookCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "color" CHAR(7) NOT NULL DEFAULT '#000000',
    "index" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "categoryId" UUID NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookContent" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT,
    "index" INTEGER NOT NULL DEFAULT 0,
    "bookId" UUID NOT NULL,

    CONSTRAINT "BookContent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookContentProp" (
    "bookContentId" UUID NOT NULL,
    "id" UUID NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "imgUrl" TEXT,
    "body" TEXT NOT NULL,
    "contentLinkId" UUID,

    CONSTRAINT "BookContentProp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BookCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookContent" ADD CONSTRAINT "BookContent_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookContentProp" ADD CONSTRAINT "BookContentProp_bookContentId_fkey" FOREIGN KEY ("bookContentId") REFERENCES "BookContent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookContentProp" ADD CONSTRAINT "BookContentProp_contentLinkId_fkey" FOREIGN KEY ("contentLinkId") REFERENCES "BookContent"("id") ON DELETE SET NULL ON UPDATE CASCADE;
