import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcrypt";

import db from "@/libs/db";

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
      return NextResponse.json({
        status: 400,
        msg: `User with email ${email} already exists`,
      });
    }

    // encrypt password before creating user
    const encryptedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: { username, email, password: encryptedPassword },
    });

    return NextResponse.json({ msg: "success" });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
