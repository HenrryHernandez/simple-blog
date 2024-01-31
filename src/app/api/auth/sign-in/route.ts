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

    const token = generateToken(email);

    cookies().set("token", token, { httpOnly: true });

    const { id, username } = userFound;

    return NextResponse.json(
      { status: 200, msg: "Login succesfull", user: { id, email, username } },
      {}
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "error" }, { status: 500 });
  }
}