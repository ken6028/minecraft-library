import { PrismaPg } from "@prisma/adapter-pg";
import { Prisma, PrismaClient } from "../generated/prisma/client";

if (!process.env.DATABASE_URL) {
    throw new Error("データベースのURLが環境変数DATABASE_URLに設定されていません。");
}

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

export const db = new PrismaClient({ adapter });




export type EX_DB_ContentPropWithLink = Prisma.contentpropGetPayload<{
    include: {
        contentLink: true
    }
}>;

export type EX_DB_ContentWithContentProp = Prisma.contentGetPayload<{
    include: {
        contentprop: {
            include: {
                contentLink: true
            },
            orderBy: {
                index: "asc"
            }
        }
    }
}>;