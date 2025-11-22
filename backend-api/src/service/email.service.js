import nodemailer from 'nodemailer'

const sendVerificationEmail = async (email, verifyToken) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  })

  const verifyLink = `${process.env.FRONTEND_URL}/verify?token=${verifyToken}`

  const mailOptions = {
    from: '"MentorAI" <no-reply@mentorai.com>',
    to: email,
    subject: 'Verify your email address',
    html: `
      <h1>Welcome to MentorAI!</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verifyLink}">${verifyLink}</a>
      <p>This link will expire in 24 hours.</p>
    `
  }

  await transporter.sendMail(mailOptions)
}

export default {
  sendVerificationEmail
}
