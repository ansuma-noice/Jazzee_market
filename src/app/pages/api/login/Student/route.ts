import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/mongodb';
import Student from '@/models/Student'; // Assuming the model file is correctly named as 'Student'
import bcrypt from 'bcryptjs';
import { getStudentFromToken } from '@/app/helper/getStudentData';

// Establish a connection to the MongoDB database
connect();

export async function POST(req: NextRequest,res:NextResponse) {
  try {
    // Parse the request body
    const { email, password, designation } = await req.json();
    const exists=false;

    // Find the student by email
    const student = await Student.findOne({ email });

    if (!student) {
      // If the student does not exist, return a 404 status with an error message
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, student.password);

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
        designation: "Student"
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


export async function GET(req:NextRequest){
  try {
    const campusId = await getStudentFromToken(req);
    const user = await Student.findOne({_id: campusId}).select("-password");
    return NextResponse.json({
      message: "Student found",
      data: user
    })
  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 400})
  }
}