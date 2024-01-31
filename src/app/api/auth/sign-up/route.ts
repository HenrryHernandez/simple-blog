import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";

import db from "@/lib/db";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const { username, email, password } = req;

  try {
    // check if user already exists
    const userFound = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          success: false,
          data: null,
          msg: `User with email ${email} already exists`,
        },
        { status: 400 }
      );
    }

    // encrypt password before creating user
    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: { username, email, password: encryptedPassword },
    });

    const { id } = newUser;

    return NextResponse.json({
      success: true,
      data: { id, username, email },
      msg: "success",
    });
  } catch (error) {
    return NextResponse.json({ sucess: false, data: null, status: 500 });
  }
}
