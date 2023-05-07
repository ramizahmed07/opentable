import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import validator from "validator";

import prisma from "@/lib/prisma";
import { generateJWT } from "@/utils/generateJWT";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const errors: string[] = [];
  const validationSchema = [
    { valid: validator.isEmail(email), errorMessage: "Email is invalid" },
    {
      valid: validator.isLength(password, { min: 1 }),
      errorMessage: "Password is invalid",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length) return NextResponse.json({ errorMessage: errors[0] });

  const user = await prisma.user.findUnique({
    where: { email },
    select: { password: true },
  });

  if (!user)
    return NextResponse.json(
      {
        errorMessage: "Incorrect email or password",
      },
      { status: 401 }
    );

  const passwordCorrect = await bcrypt.compare(password, user.password);

  if (!passwordCorrect)
    return NextResponse.json(
      {
        errorMessage: "Incorrect email or password",
      },
      { status: 401 }
    );

  const token = await generateJWT({ email: email });
  return NextResponse.json({
    token,
  });
}
