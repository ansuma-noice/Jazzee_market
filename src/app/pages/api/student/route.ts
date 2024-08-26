import type { NextApiRequest, NextApiResponse } from 'next';
import {connect} from '@/lib/mongodb';
import Campus from '@/models/Campus';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs"
import student from '@/models/student';

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {name,email,phoneNumber,collegeName,sector,jobRole,resume} = reqBody;

        const user = await student.findOne({email});

        if(user){
            return NextResponse.json({error: "User already exist"},{status: 400});
        }
        
        const newUser = new student({
            name,email,phoneNumber,collegeName,sector,jobRole,resume
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
