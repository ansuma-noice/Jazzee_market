// pages/api/student.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connect  from '@/lib/mongodb';
import Student from '@/models/Student';  // Assuming the model file is correctly named as 'student'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs";
// Establish a connection to the MongoDB database
connect();

// Handle the POST request to create a new student
export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqBody = await request.json();
        
        const { designation,name, email, phoneNumber, collegeName, sector, jobRole, resume,password } = reqBody;
        
        // Check if a student with the same email already exists
        const existingUser = await Student.findOne({ email });


        if (existingUser) {
            // Return a 400 status with an error message if the user already exists
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
        


        // Create a new student instance
        const newStudent = new Student({
            designation,
            name,
            email,
            phoneNumber,
            collegeName,
            sector,
            jobRole,
            resume,
            password: hashedPassword,
        });

        // Save the new student to the database
        await newStudent.save();

        // Return a success response with a 201 status
        return NextResponse.json({
            message: "User created successfully",
            success: true,
        }, { status: 201 });

    } catch (error: any) {
        // Catch any errors and return a 500 status with the error message
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
