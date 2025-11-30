const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Serializar usuario
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// ============= GOOGLE STRATEGY =============
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Buscar si el usuario ya existe
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      // Si no existe, crear nuevo usuario
      user = await User.create({
        googleId: profile.id,
        fullName: profile.displayName,
        email: profile.emails[0].value,
        authProvider: 'google',
        userType: 'comprador', // Por defecto
        password: 'oauth_user_no_password' // No necesita password
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// ============= GITHUB STRATEGY =============
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/github/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });

      if (user) {
        return done(null, user);
      }

      user = await User.create({
        githubId: profile.id,
        fullName: profile.displayName || profile.username,
        email: profile.emails?.[0]?.value || `${profile.username}@github.com`,
        authProvider: 'github',
        userType: 'comprador',
        password: 'oauth_user_no_password'
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

// ============= FACEBOOK STRATEGY =============
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/facebook/callback`,
    profileFields: ['id', 'displayName', 'emails']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });

      if (user) {
        return done(null, user);
      }

      user = await User.create({
        facebookId: profile.id,
        fullName: profile.displayName,
        email: profile.emails?.[0]?.value || `${profile.id}@facebook.com`,
        authProvider: 'facebook',
        userType: 'comprador',
        password: 'oauth_user_no_password'
      });

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
));

module.exports = passport;