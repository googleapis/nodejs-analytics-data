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
cohort specification in a report.

See https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport#body.request_body.FIELDS.cohort_spec
for more information.

 Before you start the application, please review the comments starting with
 "TODO(developer)" and update the code to use correct values.

 Usage:
 npm install
 node runReportWithCohorts.js
 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
  // [START analyticsdata_run_report_with_cohorts]

  // TODO(developer): Uncomment this variable and replace with your 
  // Google Analytics 4 property ID before running the sample.
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  // Initialize client that will be used to send requests. This client only 
  // needs to be created once, and can be reused for multiple requests.
  const analyticsDataClient = new BetaAnalyticsDataClient();

  // Runs a report on a cohort of users whose first session happened on the
  // same week. The number of active users and user retention rate is calculated
  //  for the cohort using WEEKLY granularity.
  async function runReport() {
    const [response] = await analyticsDataClient.runReport({
      property: "properties/${propertyId}",
      dimensions: [
        {
          name: "cohort"
        },
        {
          name: "cohortNthWeek"
        }
      ],
      metrics: [
        {
          name: "cohortActiveUsers"
        },
        {
          name: "cohortRetentionRate",
          expression: "cohortActiveUsers/cohortTotalUsers"
        }
      ],
      cohortSpec: [
        {
          cohort: [
            {
              dimension: "firstSessionDate",
              name: "cohort",
              dateRanges: {
                startDate: "2021-01-03",
                endDate: "2021-01-09"
              }
            }
          ],
          cohortsRange: {
            startOffset: 0,
            endOffset: 4,
            granuarity: cohortsRange.granuarity.WEEKLY
          }
        }
      ]
    });
  }

  function printRunReportResponse(response) {
// Print function here
    return response;
  }

  runReport();
  // [END analyticsdata_run_report_with_cohorts]
}


process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
