import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

if (!process.env.DATABASE_URL) {
    throw new Error("データベースのURLが環境変数DATABASE_URLに設定されていません。");
}

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });

export const db = new PrismaClient({ adapter });