import { db } from "@/libs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const categories = await db.category.findMany({
        where: {
            isPublished: true
        }
    });

    return NextResponse.json(categories);
}