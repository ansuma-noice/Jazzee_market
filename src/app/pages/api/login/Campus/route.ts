import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/mongodb';
import Campus from '@/models/Campus'; // Assuming the model file is correctly named as 'Student'
import bcrypt from 'bcryptjs';

// Establish a connection to the MongoDB database
connect();

export async function POST(req: NextRequest,res:NextResponse) {
  try {
    // Parse the request body
    const { coordinatorEmail, password,designation } = await req.json();
    const exists=false;

    // Find the student by email
    const campus = await Campus.findOne({ coordinatorEmail });

    if (!campus) {
      // If the student does not exist, return a 404 status with an error message
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, campus.password);

    if (!isPasswordValid) {
      // If the password is invalid, return a 401 status with an error message
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // If credentials are valid, return a success response
    return NextResponse.json(
      { 
        exists:true,
        message: "Login successful",
        designation: "Recruiter"
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Catch any errors and return a 500 status with the error message
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
