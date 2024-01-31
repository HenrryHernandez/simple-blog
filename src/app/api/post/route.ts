import { NextRequest, NextResponse } from "next/server";

import { verifyTokenAndGetPayload } from "@/helpers";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      { msg: "user not authenticated" },
      { status: 401 }
    );
  }

  const { title, content } = req;

  try {
    const validToken = await verifyTokenAndGetPayload(token.value);

    if (!validToken) {
      return NextResponse.json(
        { msg: "user not authenticated" },
        { status: 401 }
      );
    }

    const { id } = validToken;

    await db.post.create({ data: { title, content, authorId: id } });

    return NextResponse.json({ msg: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "post was not created" }, { status: 500 });
  }
}
