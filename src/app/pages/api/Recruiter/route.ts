import type { NextApiRequest, NextApiResponse } from "next";
import connect  from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Recruiter from "@/models/Recruiter";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, workEmail, phoneNumber, companyName,companySite, jobTuples } = reqBody;

    const user = await Recruiter.findOne({ workEmail });

    if (user) {
      return NextResponse.json(
        { error: "User already exist" },
        { status: 400 }
      );
    }

    const newUser = new Recruiter({
      name,
      workEmail,
      phoneNumber,
      companyName,
      companySite,
      jobTuples,
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
