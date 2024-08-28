// /pages/api/checkUser.ts

import { NextApiRequest, NextApiResponse } from 'next';

// Mock database - replace this with your actual database query logic
const mockDatabase = [
  { email: 'student@example.com', designation: 'student' },
  { email: 'recruiter@example.com', designation: 'recruiter' },
  { email: 'campus@example.com', designation: 'campus' },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Check if the user exists in the mock database
    const user = mockDatabase.find((user) => user.email === email);

    if (user) {
      res.status(200).json({ exists: true, designation: user.designation });
    } else {
      res.status(404).json({ exists: false, message: 'User does not exist, please register.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
