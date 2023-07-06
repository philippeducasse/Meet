/*these are the imported packages */
'use strict';

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");
const redirect_uris = [
  "https://philippeducasse.github.io/meet/"
];

/* SCOPES allows you to set access levels; this is set to read only for now because you don't have access rights to
update calendar yourself */

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/**
 * Credentials are values required to get access to your calendar. If you see “process.env” this means
 * the value is in the “config.json” file. This is a best practice as it keeps your API secrets hidden. 
 */

// const credentials = {

//   CLIENT_ID: process.env.CLIENT_ID,
//   project_id: process.env.PROJECT_ID,
//   CLIENT_SECRET: process.env.CLIENT_SECRET,
//   CALENDAR_ID: process.env.CALENDAR_ID,
//   auth_uri: "https://accounts.google.com/o/oauth2/auth",
//   token_uri: "https://oauth2.googleapis.com/token",
//   auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//   redirect_uris: ["https://philippeducasse.github.io/meet"],
//   javascript_origins: ["https://philippeducasse.github.io", "http://localhost:3000"],
// };

/*  this next line DESTRUCTURES the credentials */
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

/** a new instance of oAUth2 is called and created, accepts the credentials as parameters*/
const oAuth2Client = new google.auth.OAuth2(
  
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

/**
 *
 * The first step in the OAuth process is to generate a URL so users can log in with
 * Google and be authorized to see your calendar events data. After logging in, they’ll receive a code
 * as a URL parameter.
 *
 */

module.exports.getAuthURL = async () => {
  /**
   *
   * Scopes array passed to the `scope` option. Any scopes passed must be enabled in the
   * "OAuth consent screen" settings in your project on your Google Console. Also, any passed
   *  scopes are the ones users will see when the consent screen is displayed to them.
   *
   */
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl: authUrl,
    }),
  };
};

module.exports.getAccessToken = async (event) => {
  //values to instantiate the OAuthClient are at the top
  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
  );
  // decode authorisation code extracted from getAuthURL function
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {
    /**
     *  Exchange authorization code for access token with a “callback” after the exchange,
     *  The callback in this case is an arrow function with the results as parameters: “err” and “token.”
     */
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  })
    .then((token) => {
      //respond with OAuth token
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(token),
      };
    })
    .catch((err) => {
      //handle error
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
};

module.exports.getCalendarEvents = async (event) => {

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    redirect_uris[0]
  );
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);

  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),  
        singleEvents: true,
        orderBy: "startTime"
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items })
      }
    })
    .catch((err) => {
      //handle error
      console.error(err);
      return {
        statusCode: 500,
        body: JSON.stringify(err),
      };
    });
}
