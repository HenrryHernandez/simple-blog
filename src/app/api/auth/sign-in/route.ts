import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import bcrypt from "bcrypt";

import { generateToken } from "@/helpers";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const { email, password } = req;

  try {
    const userFound = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!userFound) {
      return NextResponse.json({
        status: 400,
        msg: "The user doesn't exist",
      });
    }

    const validPassword = bcrypt.compareSync(password, userFound.password);

    if (!validPassword) {
      return NextResponse.json({
        status: 400,
        msg: "Invalid password",
      });
    }

    const { id, username } = userFound;

    const token = generateToken(id, email, username);

    cookies().set("token", token, { httpOnly: true });

    return NextResponse.json(
      {
        success: true,
        msg: "Login succesfull",
        data: { user: { id, email, username } },
      },
      {}
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, data: null, msg: "error" },
      { status: 500 }
    );
  }
}
