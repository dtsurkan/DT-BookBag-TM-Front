module.exports = {
  authProvider: {
    // Client Max Age controls how often the useSession in the client should
    // contact the server to sync the session state. Value in seconds.
    clientMaxAge: 10 * 5, // 10 seconds
    // Keep Alive tells windows / tabs that are signed in to keep sending
    // a keep alive request (which extends the current session expiry) to
    // prevent sessions in open windows from expiring. Value in seconds.
    //
    // Note: If a session has expired when keep alive is triggered, all open
    // windows / tabs will be updated to reflect the user is signed out.
    keepAlive: 0,
  },
};
