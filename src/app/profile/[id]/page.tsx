import React from "react";

export default function UserProfile({ params }: any) {
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen w-screen'>
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
