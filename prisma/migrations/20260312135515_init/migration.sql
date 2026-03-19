-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "BookCategory" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "BookContent" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "BookContentProp" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
