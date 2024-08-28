"use client"

import React, { useState } from 'react';
import Login from '@/components/Login';
import RegisterForms from '@/components/RegisterForms';

export default function Home() {
  const [showForms, setShowForms] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center">
      {showForms && <Login />}
    </div>
  );
}