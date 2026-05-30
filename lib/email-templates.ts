/**
 * Email Templates & Sender — Staff Portal Notifications
 * -------------------------------------------------------
 * Uses Resend for transactional emails. All functions are non-blocking.
 * Called after admin actions (leave approve/reject, regularization, task assign).
 */
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL || "noreply@unifinders.com";

// ─── Shared Styles ────────────────────────────────────────────────────────────
const base = (content: string, subject: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:Inter,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;border:1px solid #E2E8F0;overflow:hidden;max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:#0B1A2D;padding:28px 40px;">
              <span style="color:#fff;font-size:22px;font-weight:800;letter-spacing:-0.5px;">Unifinders</span>
              <span style="color:#64748B;font-size:12px;margin-left:12px;font-weight:500;">Staff Portal</span>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              ${content}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:20px 40px;">
              <p style="color:#94A3B8;font-size:12px;margin:0;line-height:1.5;">
                This is an automated message from the Unifinders Staff Portal. Please do not reply to this email.<br/>
                &copy; ${new Date().getFullYear()} Unifinders. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

const badge = (text: string, color: string, bg: string) =>
  `<span style="display:inline-block;padding:4px 12px;border-radius:99px;background:${bg};color:${color};font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;">${text}</span>`;

const infoRow = (label: string, value: string) =>
  `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #F1F5F9;">
      <span style="display:block;font-size:11px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:3px;">${label}</span>
      <span style="font-size:14px;font-weight:600;color:#1E293B;">${value}</span>
    </td>
  </tr>`;

const ctaButton = (text: string, href: string, color = "#0070F0") =>
  `<a href="${href}" style="display:inline-block;margin-top:24px;padding:13px 28px;background:${color};color:#fff;border-radius:10px;font-size:14px;font-weight:700;text-decoration:none;">${text}</a>`;

// ─── Leave Approved ───────────────────────────────────────────────────────────

export async function sendLeaveApprovedEmail(params: {
  staffEmail: string;
  staffName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  adminNote?: string | null;
}) {
  const subject = `✅ Leave Approved — ${params.leaveType} Leave`;
  const typeLabel: Record<string, string> = {
    ANNUAL: "Annual Leave", SICK: "Sick Leave", CASUAL: "Casual Leave",
    UNPAID: "Unpaid Leave", MATERNITY: "Maternity Leave", PATERNITY: "Paternity Leave",
    BEREAVEMENT: "Bereavement Leave", COMPENSATORY: "Compensatory Leave",
  };

  const content = `
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:0 0 8px;">${badge("Approved", "#065F46", "#D1FAE5")}</h2>
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:8px 0 6px;">Your leave request has been approved</h2>
    <p style="color:#64748B;font-size:14px;margin:0 0 28px;">Hi ${params.staffName}, your leave application has been reviewed and approved by the admin.</p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;padding:20px;border:1px solid #E2E8F0;">
      ${infoRow("Leave Type", typeLabel[params.leaveType] || params.leaveType)}
      ${infoRow("From", new Date(params.startDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
      ${infoRow("To", new Date(params.endDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
      ${infoRow("Total Days", `${params.totalDays} working day${params.totalDays !== 1 ? "s" : ""}`)}
      ${params.adminNote ? infoRow("Admin Note", params.adminNote) : ""}
    </table>

    <p style="color:#64748B;font-size:13px;margin:24px 0 0;background:#ECFDF5;padding:14px;border-radius:8px;border-left:3px solid #10B981;">
      ✅ Your attendance will be automatically marked as <strong>On Leave</strong> for the approved dates.
    </p>
    ${ctaButton("View My Leave Dashboard", "https://unifinders.com/staff/leave", "#10B981")}
  `;

  return resend.emails.send({
    from: FROM,
    to: params.staffEmail,
    subject,
    html: base(content, subject),
  });
}

// ─── Leave Rejected ───────────────────────────────────────────────────────────

export async function sendLeaveRejectedEmail(params: {
  staffEmail: string;
  staffName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  adminNote?: string | null;
}) {
  const subject = `❌ Leave Rejected — ${params.leaveType} Leave`;
  const typeLabel: Record<string, string> = {
    ANNUAL: "Annual Leave", SICK: "Sick Leave", CASUAL: "Casual Leave",
    UNPAID: "Unpaid Leave", MATERNITY: "Maternity Leave", PATERNITY: "Paternity Leave",
    BEREAVEMENT: "Bereavement Leave", COMPENSATORY: "Compensatory Leave",
  };

  const content = `
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:0 0 8px;">${badge("Rejected", "#991B1B", "#FEE2E2")}</h2>
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:8px 0 6px;">Your leave request was not approved</h2>
    <p style="color:#64748B;font-size:14px;margin:0 0 28px;">Hi ${params.staffName}, unfortunately your leave application has been rejected. Please reach out to HR for further clarification.</p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;padding:20px;border:1px solid #E2E8F0;">
      ${infoRow("Leave Type", typeLabel[params.leaveType] || params.leaveType)}
      ${infoRow("Requested Dates", `${new Date(params.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} → ${new Date(params.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`)}
      ${params.adminNote ? infoRow("Reason for Rejection", params.adminNote) : infoRow("Reason for Rejection", "No specific reason provided. Please contact your manager.")}
    </table>

    ${ctaButton("View My Leave Dashboard", "https://unifinders.com/staff/leave", "#EF4444")}
  `;

  return resend.emails.send({
    from: FROM,
    to: params.staffEmail,
    subject,
    html: base(content, subject),
  });
}

// ─── Regularization Approved ──────────────────────────────────────────────────

export async function sendRegularizationApprovedEmail(params: {
  staffEmail: string;
  staffName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  adminNote?: string | null;
}) {
  const subject = `✅ Attendance Correction Approved — ${new Date(params.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  const content = `
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:0 0 8px;">${badge("Regularized", "#065F46", "#D1FAE5")}</h2>
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:8px 0 6px;">Attendance correction has been approved</h2>
    <p style="color:#64748B;font-size:14px;margin:0 0 28px;">Hi ${params.staffName}, your attendance regularization request has been approved and your log has been updated.</p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;padding:20px;border:1px solid #E2E8F0;">
      ${infoRow("Date Corrected", new Date(params.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
      ${infoRow("Check-In Time (Applied)", params.checkIn)}
      ${infoRow("Check-Out Time (Applied)", params.checkOut)}
      ${infoRow("Status Updated To", "Present ✅")}
      ${params.adminNote ? infoRow("Admin Note", params.adminNote) : ""}
    </table>

    ${ctaButton("View My Attendance Log", "https://unifinders.com/staff/attendance", "#10B981")}
  `;

  return resend.emails.send({
    from: FROM,
    to: params.staffEmail,
    subject,
    html: base(content, subject),
  });
}

// ─── Regularization Rejected ──────────────────────────────────────────────────

export async function sendRegularizationRejectedEmail(params: {
  staffEmail: string;
  staffName: string;
  date: string;
  adminNote?: string | null;
}) {
  const subject = `❌ Attendance Correction Rejected — ${new Date(params.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;

  const content = `
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:0 0 8px;">${badge("Rejected", "#991B1B", "#FEE2E2")}</h2>
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:8px 0 6px;">Attendance correction was not approved</h2>
    <p style="color:#64748B;font-size:14px;margin:0 0 28px;">Hi ${params.staffName}, your attendance regularization request for the date below has been rejected.</p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;padding:20px;border:1px solid #E2E8F0;">
      ${infoRow("Requested Date", new Date(params.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }))}
      ${infoRow("Admin Decision", "Rejected")}
      ${params.adminNote ? infoRow("Reason", params.adminNote) : infoRow("Reason", "No specific reason provided. Please contact HR.")}
    </table>

    ${ctaButton("View My Attendance Log", "https://unifinders.com/staff/attendance", "#EF4444")}
  `;

  return resend.emails.send({
    from: FROM,
    to: params.staffEmail,
    subject,
    html: base(content, subject),
  });
}

// ─── Task Assigned ────────────────────────────────────────────────────────────

export async function sendTaskAssignedEmail(params: {
  staffEmail: string;
  staffName: string;
  taskTitle: string;
  priority: string;
  dueDate?: string | null;
  description?: string | null;
  assignedByName: string;
}) {
  const subject = `📋 New Task Assigned — ${params.taskTitle}`;
  const priorityColor: Record<string, [string, string]> = {
    URGENT: ["#991B1B", "#FEE2E2"],
    HIGH: ["#92400E", "#FEF3C7"],
    MEDIUM: ["#1E40AF", "#DBEAFE"],
    LOW: ["#374151", "#F3F4F6"],
  };
  const [pColor, pBg] = priorityColor[params.priority] || priorityColor.MEDIUM;

  const content = `
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:0 0 8px;">${badge(params.priority + " Priority", pColor, pBg)}</h2>
    <h2 style="color:#0B1A2D;font-size:22px;font-weight:800;margin:8px 0 6px;">You have a new task assigned</h2>
    <p style="color:#64748B;font-size:14px;margin:0 0 28px;">Hi ${params.staffName}, <strong>${params.assignedByName}</strong> has assigned you a new task. Please review the details below and start as soon as possible.</p>
    
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;border-radius:12px;padding:20px;border:1px solid #E2E8F0;">
      ${infoRow("Task Title", params.taskTitle)}
      ${infoRow("Priority", params.priority)}
      ${infoRow("Assigned By", params.assignedByName)}
      ${params.dueDate ? infoRow("Due Date", new Date(params.dueDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })) : ""}
      ${params.description ? infoRow("Description", params.description) : ""}
    </table>

    ${ctaButton("View My Tasks", "https://unifinders.com/staff/tasks", "#0070F0")}
  `;

  return resend.emails.send({
    from: FROM,
    to: params.staffEmail,
    subject,
    html: base(content, subject),
  });
}
