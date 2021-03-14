import { FRONT_END_BASE_URL } from '../config/contants';

export const generateForgotPasswordEmail = (firstName, token) => {
  const link = `${FRONT_END_BASE_URL}/reset-forgot-password?resetToken=${token}`;
  return `<p>Dear ${firstName},</p>
  <p> Did you forget your password? No problem - click on the link below to change it now.</p>
  <p><a href=${link}>Reset Password</a></p>
  <p>If you did not ask to reset your password, please ignore this email and nothing will change.</p>
  <p>If you would like to know more about our services, please also refer to these FAQs from our customers.</p>`;
};
