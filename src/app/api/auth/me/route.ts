import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];
  if (!token)
    return NextResponse.json(
      { error: "Unauthorized request (no token)" },
      { status: 401 }
    );

  try {
    let { email } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    if (!email)
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        city: true,
        phone: true,
      },
    });

    return NextResponse.json({ me: { ...user } });
  } catch (error) {
    return NextResponse.json(
      { error: "Unauthorized request (invalid token)" },
      { status: 401 }
    );
  }
}
