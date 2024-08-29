import type { NextApiRequest, NextApiResponse } from "next";
import connect  from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Recruiter from "@/models/Recruiter";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { designation,name, workEmail, phoneNumber, companyName,companySite, jobTuples ,password} = reqBody;

    const user = await Recruiter.findOne({ workEmail });
    
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Recruiter({
      designation,
      name,
      workEmail,
      phoneNumber,
      companyName,
      companySite,
      jobTuples,
      password: hashedPassword, 
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
