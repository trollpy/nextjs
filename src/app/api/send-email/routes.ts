import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { to, subject, html, text } = await req.json();

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_SERVER_HOST,
      port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"TaskManager Pro" <${process.env.EMAIL_SERVER_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}