import { NextRequest, NextResponse } from "next/server";

import { verifyTokenAndGetPayload } from "@/helpers";

export async function GET(request: NextRequest) {
  const req = request.cookies;
  const token = req.get("token");

  try {
    if (!token) {
      return NextResponse.json(
        { success: false, data: null, msg: "not token attached" },
        { status: 401 }
      );
    }

    const validToken = await verifyTokenAndGetPayload(token.value);

    if (!validToken) {
      return NextResponse.json(
        { success: false, data: null, msg: "not valid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      data: validToken,
      msg: "success",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: null, msg: "error" },
      { status: 500 }
    );
  }
}
