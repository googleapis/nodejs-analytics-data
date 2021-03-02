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

/** Google Analytics Data API sample quickstart application.
 This application demonstrates the usage of the Analytics Data API using
 service account credentials.

 Before you start the application, please review the comments starting with
 "TODO(developer)" and update the code to use correct values.

 Usage:
   npm install
   node quickstart.js
 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID', credentialsJsonPath = '') {
  // [START google_analytics_data_quickstart]
  /**
   * TODO(developer): Uncomment this variable and replace with your
   *   Google Analytics 4 property ID before running the sample.
   */
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  // [START google_analytics_data_initialize]

  /* TODO(developer): Uncomment this variable and replace with a valid path to
   *  the credentials.json file for your service account downloaded from the
   *  Cloud Console.
   *  Otherwise, default service account credentials will be derived from
   *  the GOOGLE_APPLICATION_CREDENTIALS environment variable.
  */
  // credentialsJsonPath = '/path/to/credentials.json';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  let  analyticsDataClient;
  if (credentialsJsonPath) {
    // Explicitly use service account credentials by specifying
    // the private key file.
    analyticsDataClient = new BetaAnalyticsDataClient({
      keyFilename: credentialsJsonPath,
    });
  } else {
    // Using a default constructor instructs the client to use the credentials
    // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    analyticsDataClient = new BetaAnalyticsDataClient();
  }

  // [END google_analytics_data_initialize]

  // Runs a simple report.
  async function runReport() {
    // [START google_analytics_data_run_report]
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
    // [END google_analytics_data_run_report]

    console.log('Report result:');
    response.forEach(row => {
      console.log(row.dimensionValues[0], row.metricValues[0]);
    });
  }

  runReport();
  // [END google_analytics_data_quickstart]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
