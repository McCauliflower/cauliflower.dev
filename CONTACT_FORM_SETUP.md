# Contact Form Setup Guide

## Overview
This guide will help you set up an authenticated contact form on your Cauliflower.dev site using Auth0, Express.js, and Nodemailer with Namecheap SMTP.

## Prerequisites
- Node.js and npm installed
- Auth0 account with an application configured
- Namecheap hosting account with email setup

---

## Step 1: Install Dependencies

```bash
npm install
```

This installs:
- **express** - Backend web server
- **cors** - Cross-origin resource sharing
- **nodemailer** - Email sending library
- **dotenv** - Environment variable management
- **express-jwt** - JWT authentication middleware
- **jwks-rsa** - Auth0 key validation
- **concurrently** - Run multiple npm scripts

---

## Step 2: Configure Auth0 API

You need to set up an Auth0 API for your backend to validate JWT tokens.

### In Auth0 Dashboard:

1. **Create an API**
   - Go to Applications → APIs
   - Click "Create API"
   - Name: `Cauliflower Dev API`
   - Identifier: `https://cauliflower.dev/api` (or your domain)
   - Signing Algorithm: RS256

2. **Get Your Values**
   - Copy the API Identifier → This is your `VITE_AUTH0_AUDIENCE`

3. **Add Scopes (Optional)**
   - You can add custom scopes like "read:messages", "write:messages"
   - Not required for this basic setup

### Your `.env` file should have:

```env
VITE_AUTH0_AUDIENCE=https://cauliflower.dev/api
```

---

## Step 3: Set Up Email on Namecheap

### Create Email Account:

1. **Log in to Namecheap**
   - Go to Manage Domain → Email Accounts
   - Click "Create Email Account"
   - Email: `ghostbroccoli@cauliflower.dev`
   - Password: Choose a strong password

2. **Get SMTP Settings**
   - Go to Manage Domain → Email Accounts
   - Click "Advanced Tools" next to your email
   - SMTP Settings will show:
     - **SMTP Host**: `mail.privateemail.com`
     - **SMTP Port**: `587` (for TLS)
     - **SMTP Port**: `465` (for SSL - set SMTP_SECURE=true)
     - **Username**: `ghostbroccoli@cauliflower.dev`
     - **Password**: Your email password

### Update `.env` file:

```env
SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ghostbroccoli@cauliflower.dev
SMTP_PASS=your_actual_password_here
SMTP_FROM_EMAIL=ghostbroccoli@cauliflower.dev
CONTACT_FORM_RECIPIENT_EMAIL=your_personal_email@example.com
```

**Note**: `CONTACT_FORM_RECIPIENT_EMAIL` is where you'll receive contact form submissions. It can be the same email or a different one.

---

## Step 4: Test SMTP Connection

Run the server to verify SMTP configuration:

```bash
npm run dev:server
```

You should see:
```
✓ SMTP Server ready to send emails
```

If you get an error, check:
- Email address is correct
- Password is correct (no special characters that need escaping)
- Port is correct (587 for TLS, 465 for SSL)
- Email account is fully activated on Namecheap

---

## Step 5: Running the Application

### Option A: Run Frontend Only (Vite Dev Server)
```bash
npm run dev:vite
```
- Frontend: http://localhost:5173

### Option B: Run Backend Only (Express Server)
```bash
npm run dev:server
```
- API: http://localhost:3001

### Option C: Run Both Concurrently (Recommended for Development)
```bash
npm run dev:all
```
- Frontend: http://localhost:5173
- API: http://localhost:3001

---

## Step 6: Update Frontend API Calls

The ContactForm component is already configured to:
1. Get the Auth0 access token
2. Send authenticated POST request to `/api/contact`
3. Include user info and Auth0 user ID

### Proxy Configuration (Vite)

For development, you may need to proxy API calls. Update `vite.config.js`:

```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      }
    }
  }
}
```

---

## Step 7: Production Deployment

### Environment Variables (Server)

Set these on your hosting platform:

```env
VITE_AUTH0_DOMAIN=dev-bscikzimgp8254nw.us.auth0.com
VITE_AUTH0_CLIENT_ID=PXUwz6fKHgsaNUQy36Uy6Zj1Sn7XlRdQ
VITE_AUTH0_AUDIENCE=https://cauliflower.dev/api

PORT=3001
NODE_ENV=production

SMTP_HOST=mail.privateemail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ghostbroccoli@cauliflower.dev
SMTP_PASS=your_password
SMTP_FROM_EMAIL=ghostbroccoli@cauliflower.dev
CONTACT_FORM_RECIPIENT_EMAIL=your_email@example.com
```

### Deployment Options

1. **Heroku**
   ```bash
   heroku create your-app-name
   heroku config:set VITE_AUTH0_AUDIENCE=...
   git push heroku main
   ```

2. **Railway, Render, Fly.io**
   - Similar setup - add environment variables in dashboard
   - Deploy from git repository

3. **Your Own Server**
   - Install Node.js on server
   - Use PM2 to manage process: `pm2 start server.js`

---

## File Structure

```
cauliflower.dev/
├── server.js                      # Express backend
├── .env                           # Local environment variables
├── .env.example                   # Template for env variables
├── package.json                   # Updated with new dependencies
├── src/
│   ├── pages/
│   │   └── Auth.vue              # Updated with ContactForm
│   └── components/
│       └── ContactForm.vue       # New contact form component
└── vite.config.js               # May need proxy configuration
```

---

## API Endpoint

### POST /api/contact

**Protected**: Requires valid Auth0 JWT token

**Request Headers**:
```
Authorization: Bearer <AUTH0_ACCESS_TOKEN>
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Website Inquiry",
  "message": "I'm interested in...",
  "userId": "auth0|12345"
}
```

**Success Response** (200):
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

**Error Response** (400/401/500):
```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Features

✅ **Auth Protected**: Only authenticated Auth0 users can submit forms
✅ **Client Validation**: Form validation before submission
✅ **Server Validation**: Additional validation on backend
✅ **SMTP Configuration**: Namecheap private email integration
✅ **HTML Emails**: Formatted email templates
✅ **Confirmation Emails**: Subscribers get a copy of their message
✅ **Security**: JWT verification, input sanitization
✅ **Error Handling**: Comprehensive error messages

---

## Troubleshooting

### "Invalid or missing authentication token"
- Make sure you're logged in to Auth0
- Check that your Auth0 API audience is correct
- Verify the backend has the same VITE_AUTH0_AUDIENCE value

### "SMTP Connection Error"
- Check SMTP credentials (user, password)
- Try different SMTP port (587 vs 465)
- Verify email account is active on Namecheap
- Check firewall isn't blocking outbound mail

### "Failed to send your message"
- Check server logs for SMTP errors
- Verify recipient email is valid
- Check that FROM email matches SMTP_USER

### Form not visible
- Make sure you're logged in (isAuthenticated = true)
- Check browser console for errors
- Verify ContactForm component is imported in Auth.vue

---

## Next Steps

1. Update Auth0 API settings with your domain
2. Create email on Namecheap and get SMTP credentials
3. Install dependencies: `npm install`
4. Update `.env` file with all values
5. Run `npm run dev:all` to test locally
6. Deploy to production with environment variables

---

## Support

For issues:
- Check Auth0 documentation: https://auth0.com/docs
- Check Nodemailer docs: https://nodemailer.com
- Check Namecheap email docs: https://www.namecheap.com/support/knowledgebase/
