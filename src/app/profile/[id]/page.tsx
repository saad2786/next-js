"use client";
import React from "react";

export default function UserProfile({ params }: any) {
  const onLogout = (name: string) => {
    document.cookie =
      name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen w-screen'>
      <button
        onClick={() => onLogout("token")}
        className='py-2 px-3 rounded-md   bg-amber-600 text-black absolute top-4 right-4'
      >
        Logout
      </button>
      <h1 className='text-4xl mb-4'>
        Profile
        <span className='py-2 px-3 rounded-md   bg-amber-600 text-black ml-4'>
          {params.id}
        </span>
      </h1>
      <p>Profile Page</p>
    </div>
  );
}
