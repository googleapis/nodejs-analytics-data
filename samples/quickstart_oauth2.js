// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

/** This application demonstrates the usage of the Analytics Data API using
 OAuth2 credentials.
 Please familiarize yourself with the OAuth2 flow guide at
 https://developers.google.com/identity/protocols/oauth2

 For more information on authenticating as an end user, see
 https://cloud.google.com/docs/authentication/end-user

 In a nutshell, you need to:

 1. Create your OAuth2 client credentials in Google Cloud Console.
 Choose "Web application" when asked for an application type.

 https://support.google.com/cloud/answer/6158849

 2. When configuring the web application credentials, add
 "http://localhost:3000/oauth2callback" to "Authorized redirect URIs".
 In case a different callback URI is desired, this application needs to be
 updated accordingly.

 3. Download a credentials file using "Download JSON" button in the credentials
 configuration dialog and save it as `oauth2.keys.json` in the same
 directory with this sample app.

 4. Uncomment `propertyId` variable in main() function below and specify the
 value of the property id you want to access.

 5. Run the following commands from the current directory in order to install
 dependencies and run the sample app:

 npm install
 cd ..
 node samples/quickstart_oauth2.js
 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
  // [START analytics_data_quickstart_oauth2]
  /**
   * TODO(developer): Uncomment this variable and replace with your GA4
   *   property ID before running the sample.
   */
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  //Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  const {OAuth2Client} = require('google-auth-library');
  const {grpc} = require('google-gax');
  const http = require('http');
  const url = require('url');
  const open = require('open');
  const destroyer = require('server-destroy');

  // Reads the secrets from a `oauth2.keys.json` file, downloaded from the
  // Google Developers Console.
  // eslint-disable-next-line node/no-unpublished-require
  // eslint-disable-next-line node/no-missing-require, node/no-unpublished-require
  const keys = require('./oauth2.keys.json');

  // This sample app only calls read-only methods from the Data API. Include
  // additional scopes if calling methods that modify the configuration.
  const SCOPES = ['https://www.googleapis.com/auth/analytics.readonly'];

  // Returns the Analytics Data API client set up using the provided OAuth2
  // credentials.
  function getAnalyticsDataClient(authClient) {
    const sslCreds = grpc.credentials.createSsl();
    const credentials = grpc.credentials.combineChannelCredentials(
      sslCreds,
      grpc.credentials.createFromGoogleCredential(authClient)
    );
    return new BetaAnalyticsDataClient({
      sslCreds: credentials,
    });
  }

  /**
   * Creates a new OAuth2Client, and goes through the OAuth2 content
   * workflow.  Returns the client to the callback.
   */
  function getOAuth2Client() {
    return new Promise((resolve, reject) => {
      // Create an OAuth client to authorize the API call.
      const oAuth2Client = new OAuth2Client(
        keys.web.client_id,
        keys.web.client_secret,
        // A hardcoded callback URL used in this sample app.
        'http://localhost:3000/oauth2callback'
      );

      // Generate the url that will be used for the consent dialog.
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES.join(' '),
      });

      // Open an http server to accept the oauth callback. In this example, the
      // only request to our webserver is to /oauth2callback?code=<code>
      const server = http
        .createServer(async (req, res) => {
          try {
            if (req.url.indexOf('/oauth2callback') > -1) {
              // Acquire the code from the querystring, and close the web
              // server.
              const qs = new url.URL(req.url, 'http://localhost:3000')
                .searchParams;
              const code = qs.get('code');
              console.log(`Code is ${code}`);
              res.end(
                'Authentication successful! Please return to the console.'
              );
              server.destroy();

              // Now that we have the code, use that to acquire tokens.
              const r = await oAuth2Client.getToken(code);
              // Make sure to set the credentials on the OAuth2 client.
              oAuth2Client.setCredentials(r.tokens);
              console.info('Tokens acquired.');
              resolve(oAuth2Client);
            }
          } catch (e) {
            reject(e);
          }
        })
        .listen(3000, () => {
          // Open the browser to the authorize url to start the workflow.
          // This line will not work if you are running the code in the
          // environment where a browser is not available. In this case,
          // copy the URL and open it manually in a browser.
          console.info(`Opening the browser with URL: ${authorizeUrl}`);
          open(authorizeUrl, {wait: false}).then(cp => cp.unref());
        });
      destroyer(server);
    });
  }

  // Runs a simple report using the supplied Data API client instance.
  async function runReport() {
    // Starts the OAuth2 flow and runs the report.
    const oAuth2Client = await getOAuth2Client();
    const analyticsDataClient = getAnalyticsDataClient(oAuth2Client);

    const [response] = await analyticsDataClient.runReport({
      property: 'properties/' + propertyId,
      dateRanges: [
        {
          startDate: '2020-03-31',
          endDate: 'today',
        },
      ],
      dimensions: [
        {
          name: 'city',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
      ],
    });

    console.log('Report result:');
    response.rows.forEach(row => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
  }

  runReport();

  // [END analytics_data_quickstart_oauth2]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
