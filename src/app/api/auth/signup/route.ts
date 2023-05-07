import { NextRequest, NextResponse } from "next/server";
import validator from "validator";
import bcrypt from "bcrypt";

import prisma from "@/lib/prisma";
import { generateJWT } from "@/utils/generateJWT";

export async function POST(req: NextRequest) {
  const { firstName, lastName, city, password, email, phone } =
    await req.json();
  const errors: string[] = [];
  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "First name is invalid",
    },
    {
      valid: validator.isLength(lastName, {
        min: 1,
        max: 20,
      }),
      errorMessage: "Last name is invalid",
    },
    {
      valid: validator.isEmail(email),
      errorMessage: "Email is invalid",
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: "Phone number is invalid",
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: "City is invalid",
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: "Password is invalid",
    },
  ];
  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });
  if (errors.length) return NextResponse.json({ errorMessage: errors[0] });

  const userExists = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });
  if (userExists)
    return NextResponse.json(
      { errorMessage: "Email is already taken" },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      first_name: firstName,
      last_name: lastName,
      city,
      email,
      phone,
      password: hashedPassword,
    },
  });

  const token = await generateJWT({ email: user.email });

  return NextResponse.json({
    token,
  });
}
