import type { NextApiRequest, NextApiResponse } from 'next';
import connect from '@/lib/mongodb';
import Campus from '@/models/Campus';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from "bcryptjs"; 
async function Connecter() {
    try {
      await connect();
    } catch (error: any) {
      console.log(error);
    }
  }

export async function POST(request: NextRequest){
    try {
        await Connecter();
        const reqBody = await request.json();
        const {designation,universityName,coordinatorName,coordinatorEmail,universitySite,coordinatorPhoneNumber,collegeAddress,pinCode,jobTuples,password} = reqBody;
        
        if (!designation || !universityName || !coordinatorName || !coordinatorEmail ||
            !universitySite || !coordinatorPhoneNumber || !collegeAddress || !pinCode ||
            !jobTuples || !password) {
          return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
        }

        const user = await Campus.findOne({coordinatorEmail});
        
        if(user){
            return NextResponse.json(
                {error: "User already exist"},
                {status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10
        
        const newUser = new Campus({
            designation,
            universityName,
            coordinatorName,
            coordinatorEmail,
            universitySite,
            coordinatorPhoneNumber,
            collegeAddress,
            pinCode,
            jobTuples,
            password:hashedPassword
        })
        
        console.log('jingalala');
        await newUser.save();

        return NextResponse.json({
            message: "User created successfully",
            success: true
        },{status: 201});

        

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}

  export async function GET(request: NextRequest) {
    try {
      await Connecter();
      const campuses = await Campus.find({});
      return NextResponse.json(campuses, { status: 200 });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }