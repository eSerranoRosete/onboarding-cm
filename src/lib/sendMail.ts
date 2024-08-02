"use server";

import { Resend } from "resend";
import { decryptString } from "./cryptoUtils";

interface IFParams {
  body: IFBody;
}

export interface IFBody {
  destEmail: string;
  body: string;
  header: string;
  attachments: any[];
}

export async function sendEmail(payload: IFParams) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const newAttachments = payload.body.attachments.map((file) => ({
    ...file,
    content: base64ToBuffer(file.content),
  }));

  const decriptedString = await decryptString(payload.body.destEmail);

  if (isValidEmail(decriptedString)) {
    const { data, error } = await resend.emails.send({
      from: "Moduly Notifications <notifications@moduly.app>",
      to: [decriptedString],
      subject: payload.body.header,
      html: payload.body.body,
      attachments: newAttachments,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}

function base64ToBuffer(base64String: string) {
  // Extract the Base64 part from the data URI scheme if present
  const base64Data = base64String.replace(/^data:application\/pdf;base64,/, "");

  // Convert Base64 string to Buffer
  return Buffer.from(base64Data, "base64");
}

/**
 * Check if an email has a valid format.
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email format is valid, otherwise false.
 */
export const isValidEmail = (email: string) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
