import { NextRequest, NextResponse } from "next/server";

import { verifyTokenAndGetPayload } from "@/helpers";
import { AllowedQueries } from "@/interfaces";
import db from "@/lib/db";

export async function POST(request: NextRequest) {
  const req = await request.json();
  const token = request.cookies.get("token");

  if (!token) {
    return NextResponse.json(
      { success: false, data: null, msg: "user not authenticated" },
      { status: 401 }
    );
  }

  const { title, content } = req;

  try {
    const validToken = await verifyTokenAndGetPayload(token.value);

    if (!validToken) {
      return NextResponse.json(
        { success: false, data: null, msg: "user not authenticated" },
        { status: 401 }
      );
    }

    const { id } = validToken;

    const newPost = await db.post.create({
      data: { title, content, authorId: id },
    });

    return NextResponse.json({ success: true, data: newPost, msg: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, data: null, msg: "post was not created" },
      { status: 500 }
    );
  }
}

function isAllowedQuery(query: AllowedQueries): query is AllowedQueries {
  return ["title", "authorId", "content", null].includes(query);
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key") as AllowedQueries;
  const value = request.nextUrl.searchParams.get("value");

  try {
    let posts;

    // check it is a valid search param
    if (!key || !isAllowedQuery(key) || !value) {
      posts = await db.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          author: { select: { id: true, username: true, email: true } },
          createdAt: true,
        },
      });
    } else {
      posts = await db.post.findMany({
        where: {
          [key]: {
            equals: key === "authorId" ? Number(value) : value,
          },
        },
        select: {
          id: true,
          title: true,
          content: true,
          author: { select: { id: true, username: true, email: true } },
          createdAt: true,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: { total: posts.length, posts },
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
