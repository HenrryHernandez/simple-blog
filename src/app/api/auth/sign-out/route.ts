import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  try {
    cookies().delete("token");

    return NextResponse.json({
      success: true,
      data: null,
      msg: "Sign out successful",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: null, msg: "error to sign out" },
      { status: 500 }
    );
  }
}
