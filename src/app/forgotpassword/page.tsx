"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function ForgotPage() {
  const [email, setEmail] = useState("");
  const onSubmit = async () => {
    try {
      await axios.post("/api/users/forgotpassword", { email });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen w-screen'>
      <h1 className='text-2xl mb-4'>Verify email</h1>

      <label htmlFor='email'>email</label>
      <input
        type='email'
        id='email'
        className='p-2 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none text-black'
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder='email'
      />
      <button
        className='border-2 mb-2 border-white rounded-lg py-2 px-3 hover:bg-slate-50 hover:text-black'
        type='submit'
        onClick={onSubmit}
      >
        Submit
      </button>

      <Link href='/signup'>visit signup page</Link>
    </div>
  );
}
