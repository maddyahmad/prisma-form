import { NextResponse } from "next/server";
import { validationSchema } from "@/app/lib/validation";
import { prisma } from "@/app/lib/prisma";
import * as yup from "yup";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    // Validate the request body
    const validatedData = await validationSchema.validate(body, {
      abortEarly: false,
    });

    const existing = await prisma.application.findUnique({
      where: { email: validatedData.email },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 409 },
      );
    }

    // Save to database
    const application = await prisma.application.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        age: validatedData.age,
        gender: validatedData.gender || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully",
        data: application,
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: errors,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
