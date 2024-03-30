"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className='flex items-center flex-col h-screen w-screen justify-center '>
      <h1 className='text-4xl '>Verify Email</h1>
      <h2 className='text-2xl bg-orange-500 text-black p-3'>
        {token ? token : "no token"}
      </h2>
      {verified && (
        <div>
          <h3>Email Verified</h3>
          <Link href='/login'>
            <button className='p-2 bg-green-700 '>Login</button>
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h1 className='text-4xl text-white '>Error</h1>
        </div>
      )}
    </div>
  );
}
