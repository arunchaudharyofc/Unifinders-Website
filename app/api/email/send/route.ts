/**
 * POST /api/email/send
 * ─────────────────────
 * Sends transactional emails via Resend.
 * Used for: appointment confirmations, OTP, welcome emails.
 * 
 * Requires: RESEND_API_KEY in .env.local
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "noreply@unifinders.com";

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[Email] RESEND_API_KEY not configured");
    return NextResponse.json({ success: false, error: "Email service not configured" }, { status: 503 });
  }

  try {
    const body = await req.json();
    const { type, to, data } = body;

    if (!type || !to) {
      return NextResponse.json({ success: false, error: "Missing type or to" }, { status: 400 });
    }

    let subject = "";
    let html = "";

    switch (type) {
      case "appointment_confirmation":
        subject = "Appointment Confirmed — Unifinders Education";
        html = appointmentConfirmationEmail(data);
        break;
      case "welcome":
        subject = "Welcome to Unifinders! 🎓";
        html = welcomeEmail(data);
        break;
      default:
        return NextResponse.json({ success: false, error: "Unknown email type" }, { status: 400 });
    }

    const { data: result, error } = await resend.emails.send({
      from: `Unifinders Education <${FROM_EMAIL}>`,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error("[Resend Error]", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: result?.id });
  } catch (e) {
    console.error("[Email API Error]", e);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}

/* ── Email Templates ── */

function appointmentConfirmationEmail(data: Record<string, string>) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1D4ED8,#2563EB);padding:32px 40px;text-align:center;">
      <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:50%;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;">
        <span style="color:white;font-weight:900;font-size:18px;">U</span>
      </div>
      <h1 style="color:#ffffff;margin:0;font-size:22px;font-weight:800;">Appointment Received!</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">We'll confirm your session shortly</p>
    </div>
    <!-- Body -->
    <div style="padding:32px 40px;">
      <p style="color:#334155;font-size:15px;margin:0 0 20px;">Hi <strong>${data?.fullName || "there"}</strong>,</p>
      <p style="color:#64748b;font-size:14px;margin:0 0 24px;line-height:1.6;">
        Thank you for booking a counseling session with Unifinders. Our team will review your request and confirm within <strong>2–4 hours</strong>.
      </p>
      <!-- Details Card -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <h3 style="color:#1e293b;font-size:13px;font-weight:700;margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em;">Booking Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#64748b;font-size:13px;padding:4px 0;width:40%;">Service</td><td style="color:#1e293b;font-size:13px;font-weight:600;">${data?.service || "—"}</td></tr>
          <tr><td style="color:#64748b;font-size:13px;padding:4px 0;">Preferred Date</td><td style="color:#1e293b;font-size:13px;font-weight:600;">${data?.preferredDate || "—"}</td></tr>
          <tr><td style="color:#64748b;font-size:13px;padding:4px 0;">Time Slot</td><td style="color:#1e293b;font-size:13px;font-weight:600;">${data?.timeSlot || "—"}</td></tr>
          <tr><td style="color:#64748b;font-size:13px;padding:4px 0;">Country Interest</td><td style="color:#1e293b;font-size:13px;font-weight:600;">${data?.country || "Not specified"}</td></tr>
        </table>
      </div>
      <div style="text-align:center;margin-bottom:24px;">
        <a href="https://unifinders.com/appointment" style="display:inline-block;background:#1D4ED8;color:#ffffff;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">View My Booking</a>
      </div>
      <p style="color:#94a3b8;font-size:12px;text-align:center;margin:0;">
        Questions? Contact us at <a href="mailto:info@unifinders.com" style="color:#1D4ED8;">info@unifinders.com</a>
      </p>
    </div>
    <!-- Footer -->
    <div style="background:#f1f5f9;padding:20px 40px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:11px;margin:0;">© 2024 Unifinders Education Pvt. Ltd. · Kathmandu, Nepal</p>
    </div>
  </div>
</body>
</html>`;
}

function welcomeEmail(data: Record<string, string>) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
    <div style="background:linear-gradient(135deg,#1D4ED8,#2563EB);padding:32px 40px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;font-weight:800;">Welcome to Unifinders! 🎓</h1>
      <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Your global education journey starts here</p>
    </div>
    <div style="padding:32px 40px;">
      <p style="color:#334155;font-size:15px;">Hi <strong>${data?.fullName || "there"}</strong>,</p>
      <p style="color:#64748b;font-size:14px;line-height:1.6;">
        You've successfully joined Unifinders. Explore 120+ partner universities, get free counseling, and start your study abroad journey today.
      </p>
      <div style="text-align:center;margin:28px 0;">
        <a href="https://unifinders.com/dashboard" style="display:inline-block;background:#1D4ED8;color:#ffffff;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:700;text-decoration:none;">Go to Dashboard →</a>
      </div>
    </div>
    <div style="background:#f1f5f9;padding:16px 40px;text-align:center;border-top:1px solid #e2e8f0;">
      <p style="color:#94a3b8;font-size:11px;margin:0;">© 2024 Unifinders Education Pvt. Ltd.</p>
    </div>
  </div>
</body>
</html>`;
}
