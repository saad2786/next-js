import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/userModel";

// Ensure that the database connection is established
connect();

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const reqBody = await request.json();
    const { email } = reqBody;
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }
    await sendEmail({
      email,
      emailType: "RESET",
      userId: user._id,
    });

    return NextResponse.json({
      message: "Email sent successfully",
      success: true,
    });
  } catch (error: any) {
    // Handle errors and return an error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
