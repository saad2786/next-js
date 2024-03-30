"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function page() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const resetPassword = async () => {
    try {
      await axios.post("/api/users/resetpassword", { token, newPassword });
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

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (
      token.length > 0 &&
      newPassword.length > 0 &&
      newPassword === confirmPassword
    ) {
      resetPassword();
    }
  };
  return (
    <div className='flex flex-col gap-2 items-center justify-center h-screen w-screen'>
      <h1 className='text-4xl'>Reset Password</h1>
      <h2 className='text-2xl bg-orange-500 text-black p-3'>
        {token ? token : "no token"}
      </h2>
      {verified ? (
        <>
          <h1 className='text-2xl bg-teal-500 text-black p-3'>
            Password Reset Successfully
          </h1>
        </>
      ) : (
        <>
          <form
            className='flex flex-col gap-4 items-center'
            onSubmit={(e) => onSubmit(e)}
          >
            <input
              type='password'
              placeholder='password'
              value={newPassword}
              className='p-2 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none text-black'
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type='password'
              value={confirmPassword}
              placeholder='repeat password'
              className='p-2 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none text-black'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className='border-2 mb-2 border-white rounded-lg py-2 px-3 hover:bg-slate-50 hover:text-black'
              type='submit'
            >
              Reset{" "}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
