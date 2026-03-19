-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "BookContent" DROP CONSTRAINT "BookContent_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BookContentProp" DROP CONSTRAINT "BookContentProp_bookContentId_fkey";

-- AlterTable
ALTER TABLE "BookContent" ADD COLUMN     "color" CHAR(7) NOT NULL DEFAULT '#000000';

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "BookCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookContent" ADD CONSTRAINT "BookContent_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookContentProp" ADD CONSTRAINT "BookContentProp_bookContentId_fkey" FOREIGN KEY ("bookContentId") REFERENCES "BookContent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
