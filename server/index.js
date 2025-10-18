import dotenv from 'dotenv'
import express from 'express';
import pkg from 'express-openid-connect';
import cors from 'cors';

const { auth, requiresAuth } = pkg;
dotenv.config({ path: '.env' })

const app = express();

// CORS configuration for Vite dev server
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  routes: {
    login: '/auth/login',
    logout: '/auth/logout',
    callback: '/auth/callback',
  }
};

app.use(auth(config));

// Check if user is authenticated
app.get('/api/user', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: req.oidc.user
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Protected API route example
app.get('/api/protected', requiresAuth(), (req, res) => {
  res.json({ 
    message: 'This is protected data',
    user: req.oidc.user 
  });
});

// Additional API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Public data' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});