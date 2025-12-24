import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import jwksRsa from 'jwks-rsa';
import jwt from 'express-jwt';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Auth0 JWT Verification Middleware
const checkJwt = jwt({
  secret: jwksRsa.expressMiddleware(jwksRsa.JwksClient({
    jwksUri: `https://${process.env.VITE_AUTH0_DOMAIN}/.well-known/jwks.json`
  })),
  audience: process.env.VITE_AUTH0_AUDIENCE,
  issuer: `https://${process.env.VITE_AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Test SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('✓ SMTP Server ready to send emails');
  }
});

// Health check endpoint (no auth required)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Contact form server is running' });
});

// Contact form endpoint (auth required)
app.post('/api/contact', checkJwt, async (req, res) => {
  try {
    const { name, email, subject, message, userId } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'All fields are required: name, email, subject, message'
      });
    }

    if (message.length < 10) {
      return res.status(400).json({
        error: 'Message must be at least 10 characters long'
      });
    }

    // Prepare email to you
    const mailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: process.env.CONTACT_FORM_RECIPIENT_EMAIL,
      subject: `New Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p><strong>From:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <h3 style="color: #333;">Message:</h3>
          <p style="color: #666; white-space: pre-wrap; line-height: 1.6;">
            ${escapeHtml(message)}
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            User ID: ${userId}<br>
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      `,
      replyTo: email, // Allow easy reply
    };

    // Optional: Send confirmation email to user
    const confirmationMailOptions = {
      from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
      to: email,
      subject: 'We received your message',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thanks for reaching out!</h2>
          <p>Hi ${escapeHtml(name)},</p>
          <p>We've received your message and will get back to you as soon as possible.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666;"><strong>Your message:</strong></p>
          <p style="color: #666; background: #f5f5f5; padding: 15px; border-radius: 4px; white-space: pre-wrap;">
            ${escapeHtml(message)}
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">
            This is an automated response. Please don't reply to this email.
          </p>
        </div>
      `,
    };

    // Send emails
    await Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(confirmationMailOptions)
    ]);

    // Log submission (optional - for your records)
    console.log(`✓ Contact form submitted by ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to send your message. Please try again later.'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  
  // JWT errors
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Invalid or missing authentication token'
    });
  }

  res.status(500).json({
    error: 'An error occurred processing your request'
  });
});

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   Contact Form Server Running              ║
║   Port: ${PORT}                              ║
║   Endpoint: POST /api/contact              ║
║   Auth: Auth0 JWT required                 ║
╚════════════════════════════════════════════╝
  `);
});

export default app;
