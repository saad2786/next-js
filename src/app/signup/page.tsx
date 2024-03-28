"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);
  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen w-screen'>
      <h1 className='text-2xl mb-4'>{loading ? "Processing" : "Signup"}</h1>
      <label htmlFor='username'>username</label>
      <input
        type='text'
        id='username'
        className='p-2 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none text-black'
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
        placeholder='username'
      />
      <label htmlFor='email'>email</label>
      <input
        type='email'
        id='email'
        className='p-2 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none text-black'
        value={user.email}
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
        placeholder='email'
      />
      <label htmlFor='password'>password</label>
      <input
        type='password'
        id='password'
        className='p-2 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none text-black'
        value={user.password}
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
        placeholder='password'
      />
      <button
        className='border-2 mb-2 border-white rounded-lg py-2 px-3 hover:bg-slate-50 hover:text-black'
        type='submit'
        onClick={onSignup}
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>
      <Link href='/login'>visit login page</Link>
    </div>
  );
}
