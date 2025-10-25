// server/index.js
import dotenv from 'dotenv'
import express from 'express';
import pkg from 'express-openid-connect';
import cors from 'cors';
import helmet from 'helmet'
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const { auth, requiresAuth } = pkg;

// Load .env file located next to this server file (so running from project root still finds it)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

// Fail fast with a clear message if the secret is missing
if (!process.env.AUTH0_SESSION_SECRET) {
  console.error('Missing AUTH0_SECRET environment variable.\nCreate a server/.env file or set AUTH0_SECRET in your environment.');
  process.exit(1);
}

const app = express();

// CORS configuration for Vite dev server
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false, // relax in dev; harden later
}))

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SESSION_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  routes: {
    login: false,
    logout: '/auth/logout',
    callback: '/auth/callback',
  },
  authorizationParams: {
    response_type: 'code',
    scope: 'openid profile email',
  },
  afterCallback: (req, res, session, state) => {
    // You can mutate the session here, if needed:
    session.user.lastLogin = new Date().toISOString();
    return '/pages/auth/auth.html';
  },
};
app.use(auth(config));

app.get('/auth/login', (req, res) => {
  res.oidc.login({
    returnTo: '/pages/auth/auth.html', // or wherever you want to land
    authorizationParams: {
      response_type: 'code',
      scope: 'openid profile email',
      ...(process.env.AUTH0_AUDIENCE ? { audience: process.env.AUTH0_AUDIENCE } : {}),
    },
  });
});

// Check if user is authenticated
app.get('/api/user', (req, res) => {
  console.log('User info request received');
  if (req.oidc.isAuthenticated()) {
    console.log('User is authenticated:', req.oidc.user);
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

// The /profile route will show the user profile as JSON
app.get('/api/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});


// Additional API routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Public data' });
});

// --- If you requested an audience, you can grab an access token server-side
app.get('/api/token', requiresAuth(), async (req, res) => {
  const at = req.oidc.accessToken
  res.json({
    hasAccessToken: !!at,
    accessToken: at?.token ?? null,
    expiresAt: at?.expiresAt ?? null
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});