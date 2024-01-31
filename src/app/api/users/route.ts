import { NextResponse } from "next/server";

import db from "@/lib/db";

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: { id: true, username: true, email: true },
    });

    return NextResponse.json({
      success: true,
      data: { users },
      msg: "success",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, data: null, msg: "" },
      { status: 500 }
    );
  }
}
