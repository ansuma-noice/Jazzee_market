import type { NextApiRequest, NextApiResponse } from 'next';
import {connect} from '@/lib/mongodb';
import Campus from '@/models/Campus';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs"

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {universityName,coordinatorName,coordinatorEmail,coordinatorPhoneNumber,collegeAddress,pinCode,jobTuples} = reqBody;

        const user = await Campus.findOne({coordinatorEmail});

        if(user){
            return NextResponse.json({error: "User already exist"},{status: 400});
        }
        
        const newUser = new Campus({
            universityName,coordinatorName,coordinatorEmail,coordinatorPhoneNumber,collegeAddress,pinCode,jobTuples
        })

        await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true
        },{status: 201});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
