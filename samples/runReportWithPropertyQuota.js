// Copyright 2022 Google LLC
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

/** Google Analytics Data API sample application demonstrating the usage of
property quota metadata.

See https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport#body.request_body.FIELDS.return_property_quota
for more information.

 Before you start the application, please review the comments starting with
 "TODO(developer)" and update the code to use correct values.

 Usage:
 npm install
 node runReportWithPropertyQuota.js
 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
  // [START analyticsdata_run_report_with_property_quota]

  // TODO(developer): Uncomment this variable and replace with your
  // Google Analytics 4 property ID before running the sample.
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  // Initialize client that will be used to send requests. This client only
  // needs to be created once, and can be reused for multiple requests.
  const analyticsDataClient = new BetaAnalyticsDataClient();

  // Runs a report and prints property quota information.
  async function runReportWithPropertyQuota() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      returnPropertyQuota: true,
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
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
    });
    printPropertyQuotaResponse(response);
  }

  runReportWithPropertyQuota();

  // Prints results of a runReport call with property quota
  function printPropertyQuotaResponse(response) {
    // [START analyticsdata_run_report_with_property_quota_print_response]
    if (response.propertyQuota) {
      console.log(
        `Tokens per day quota consumed: ${response.propertyQuota.tokensPerDay.consumed},` +
          ` remaining: ${response.propertyQuota.tokensPerDay.remaining}`
      );

      console.log(
        `Tokens per hour quota consumed: ${response.propertyQuota.tokensPerHour.consumed}` +
          `, remaining: ${response.propertyQuota.tokensPerHour.remaining}`
      );

      console.log(
        `Concurrent requests quota consumed: ${response.propertyQuota.concurrentRequests.consumed}` +
          `, remaining: ${response.propertyQuota.concurrentRequests.remaining}`
      );

      console.log(
        'Server errors per project per hour quota consumed: ' +
          response.propertyQuota.serverErrorsPerProjectPerHour.consumed +
          ', remaining: ' +
          response.propertyQuota.serverErrorsPerProjectPerHour.remaining
      );

      console.log(
        'Potentially thresholded requests per hour quota consumed: ' +
          `${response.propertyQuota.potentiallyThresholdedRequestsPerHour.consumed}` +
          `, remaining: ${response.propertyQuota.potentiallyThresholdedRequestsPerHour.remaining}`
      );
    }
    // [END analyticsdata_run_report_with_property_quota_print_response]
  }
  // [END analyticsdata_run_report_with_property_quota]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
