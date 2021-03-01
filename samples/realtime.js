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

/** This application demonstrates the usage of the Analytics Data API realtime
 reporting functionality using service account credentials.

 Realtime report documentation:

 https://developers.google.com/analytics/devguides/reporting/data/v1/realtime-basics

 For more information on service accounts, see

 https://cloud.google.com/iam/docs/understanding-service-accounts

 The following document provides instructions on setting service account
 credentials for your application:

 https://cloud.google.com/docs/authentication/production

 In a nutshell, you need to:

 1. Create a service account and download the key JSON file.
 https://cloud.google.com/docs/authentication/production#creating_a_service_account

 2. Provide service account credentials using one of the following options:
 - set the GOOGLE_APPLICATION_CREDENTIALS environment variable, the API
 client will use the value of this variable to find the service account key
 JSON file.

 https://cloud.google.com/docs/authentication/production#setting_the_environment_variable

 OR
 - manually pass the path to the service account key JSON file to the API client
 by specifying the keyFilename parameter in the constructor.

 https://cloud.google.com/docs/authentication/production#passing_the_path_to_the_service_account_key_in_code

 3. Uncomment `propertyId` variable in main() function below and specify the
 value of the property id you want to access.

 4. Run the following commands from the current directory in order to install
 dependencies and run the sample app:

 npm install
 cd ..
 node samples/realtime.js

 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
  // [START analytics_data_realtime]
  /**
   * TODO(developer): Uncomment this variable and replace with your GA4
   *   property ID before running the sample.
   */
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  // Creates a client.
  const analyticsDataClient = new BetaAnalyticsDataClient();

  // Runs a realtime report.
  async function runRealtimeReport() {
    const [response] = await analyticsDataClient.runRealtimeReport({
      // The property parameter value must be in the form `properties/1234`
      // where `1234` is a GA4 property Id.
      property: 'properties/' + propertyId,
      dimensions: [
        {
          name: 'country',
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

  runRealtimeReport();
  // [END analytics_data_realtime]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
