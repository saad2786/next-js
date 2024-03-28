import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not exists" }, { status: 400 });
    }

    console.log(user.password);
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Password Not matched" },
        { status: 400 },
      );
    }

    //Create token data
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    //create token
    const token = jwt.sign(tokenData, process.env.TOKEN_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login Successful",
      status: true,
    });
    // set cookies
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
