"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast/headless";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>({});
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged Out");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserData = async () => {
    try {
      const response = await axios.get("/api/users/me");
      console.log(response.data.data);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen w-screen'>
      <button
        onClick={onLogout}
        className='py-2 px-3 rounded-md   bg-amber-500 text-black absolute top-4 right-4'
      >
        Logout
      </button>
      <h1 className='text-4xl mb-4'>Profile Page</h1>
      <Link href={`/profile/${userData.username}`}>
        <p className='py-2 px-3 rounded-md   bg-slate-100 text-black'>
          {userData.username || "Nothing"}
        </p>
      </Link>
      <button
        onClick={getUserData}
        className='py-2 px-3 rounded-md   bg-amber-500 text-black mx-auto'
      >
        Fetch
      </button>
    </div>
  );
}
