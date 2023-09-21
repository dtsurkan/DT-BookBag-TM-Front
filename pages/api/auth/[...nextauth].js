import { getAuthCallbackProviderStrapi, loginUserToStrapi } from 'lib/strapi/services/auth';
import { checkErrorCode } from 'lib/strapi/shared/errors';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Providers.Credentials({
      // If you return null or false then the credentials will be rejected
      // You can also Reject this callback with an Error or with a URL:
      // throw new Error('error message') // Redirect to error page
      // throw '/path/to/redirect'        // Redirect to a URL
      async authorize(credentials) {
        console.log(`credentials`, credentials);
        let user = null;

        const response = await loginUserToStrapi(credentials);

        if (!checkErrorCode(response.status)) {
          user = response.data;
          return user;
        } else {
          // NOTE! Pass stringify error object and in client parsed and show to user
          throw new Error(JSON.stringify(response.data));
        }
      },
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  // database: process.env.DATABASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  //   secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60, // 1 day
    // maxAge: 30 * 24 * 60 * 60, // 30 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/auth/auth/login',
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks

  callbacks: {
    // async signIn(user, account, profile) { return true },
    // async redirect(url, baseUrl) { return baseUrl },
    // async session(session, user) { return session },
    // async jwt(token, user, account, profile, isNewUser) { return token }
    session: async (session, user) => {
      console.log(`sessionqqqqq`, session);
      console.log(`userqqqqqqqq`, user);
      session.jwt = user.jwt;
      session.profile = user.profile;
      return session;
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      console.log(`token`, token);
      console.log(`user`, user);
      console.log(`account`, account);
      console.log(`profile`, profile);
      console.log(`isNewUser`, isNewUser);
      const isInitialSignIn = account && user ? true : false;
      console.log(`isSiisInitialSignIngnIn`, isInitialSignIn);

      if (isInitialSignIn) {
        if (account.type === 'credentials') {
          token.jwt = profile.jwt;
          token.profile = profile.user;
        } else if (account.type === 'oauth') {
          const response = await getAuthCallbackProviderStrapi(
            account.provider,
            account?.accessToken
          );
          console.log(`response.data`, response.data);

          token.jwt = response.data.jwt;
          token.profile = response.data.user;
        }
      }
      console.log(`token`, token);
      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  //   events: {},
  // events: {
  //   async signIn(message) {
  //     /* on successful sign in */
  //     console.log(`message signIn signIn`, message);
  //   },
  //   async signOut(message) {
  //     /* on signout */
  //     console.log(`message signOut signOut`, message);
  //   },
  //   async createUser(message) {
  //     /* user created */
  //   },
  //   async updateUser(message) {
  //     /* user updated - e.g. their email was verified */
  //   },
  //   async linkAccount(message) {
  //     /* account (e.g. Twitter) linked to a user */
  //   },
  //   async session(message) {
  //     console.log(`message session session`, message);
  //     /* session is active */
  //   },
  //   async error(message) {
  //     /* error in authentication flow */
  //   },
  // },

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  //   theme: 'light',

  // Enable debug messages in the console if you are having problems
  //   debug: false,
});
