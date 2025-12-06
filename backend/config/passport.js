const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');
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

// ============== HELPER ====================
function isProviderConfigured(clientId, clientSecret) {
  return Boolean(clientId && clientSecret && clientId.trim() !== '' && clientSecret.trim() !== '');
}

// ============== GOOGLE STRATEGY ====================
const googleConfigured = isProviderConfigured(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

if (googleConfigured) {
  console.log('Google OAuth configurado');
  
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        user = await User.create({
          googleId: profile.id,
          fullName: profile.displayName,
          email: profile.emails[0].value,
          authProvider: 'google',
          userType: 'comprador',
          password: 'oauth_user_no_password'
        });

        done(null, user);
      } catch (error) {
        console.error('Error en Google OAuth:', error);
        done(error, null);
      }
    }
  ));
} else {
  console.log('Google OAuth NO configurado');
}

// ============== GITHUB STRATEGY ====================
const githubConfigured = isProviderConfigured(
  process.env.GITHUB_CLIENT_ID,
  process.env.GITHUB_CLIENT_SECRET
);

if (githubConfigured) {
  console.log('GitHub OAuth configurado');
  
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
        console.error('Error en GitHub OAuth:', error);
        done(error, null);
      }
    }
  ));
} else {
  console.log(' GitHub OAuth NO configurado');
}
console.log('\n Resumen de OAuth Providers:');
console.log(`   Google:   ${googleConfigured ? ' Activo' : ' Inactivo'}`);
console.log(`   GitHub:   ${githubConfigured ? ' Activo' : ' Inactivo'}`);
console.log(`   Facebook:  Deshabilitado\n`);

module.exports = passport;