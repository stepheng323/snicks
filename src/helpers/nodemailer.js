/* eslint-disable object-curly-newline */
import nodemailer from 'nodemailer';
import { EMAIL_SENDER, EMAIL_SENDER_PASSWORD } from '../config/contants';

/**
 *
 * @param {String} to
 * @param {String} subject
 * @param {String} body
 * @returns {Promise} null
 */
export const sendMail = async ({ to, subject, body }) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_SENDER,
      pass: EMAIL_SENDER_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Snicks" <foo@example.com>',
    to,
    subject,
    html: body,
  });
};
