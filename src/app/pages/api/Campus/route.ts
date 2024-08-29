import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/lib/mongodb';
import Campus from '@/models/Campus';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs"; 
connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {designation,universityName,coordinatorName,coordinatorEmail,universitySite,coordinatorPhoneNumber,collegeAddress,pinCode,jobTuples,password} = reqBody;
        
        const user = await Campus.findOne({coordinatorEmail});
        
        if(user){
            return NextResponse.json({error: "User already exist"},{status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
        
        const newUser = new Campus({
            designation,
            universityName,coordinatorName,coordinatorEmail,universitySite,coordinatorPhoneNumber,collegeAddress,pinCode,jobTuples,
            password:hashedPassword
        })
        
        await newUser.save();
        console.log('jingalala');

        return NextResponse.json({
            message: "User created successfully",
            success: true
        },{status: 201});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
