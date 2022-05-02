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

/** Google Analytics Data API sample application demonstrating the creation of
a pivot report.

See https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runPivotReport
for more information.

 Before you start the application, please review the comments starting with
 "TODO(developer)" and update the code to use correct values.

 Usage:
 npm install
 node runPivotReport.js
 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
  // [START analyticsdata_run_pivot_report]

  // TODO(developer): Uncomment this variable and replace with your
  // Google Analytics 4 property ID before running the sample.
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  // Initialize client that will be used to send requests. This client only
  // needs to be created once, and can be reused for multiple requests.
  const analyticsDataClient = new BetaAnalyticsDataClient();

  // Runs a pivot query to build a report of session counts by country, pivoted by the browser dimension.
  async function runPivotReport() {
    const [response] = await analyticsDataClient.runPivotReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '2021-01-01',
          endDate: '2021-01-30',
        },
      ],
      pivots: [
        {
          fieldNames: ['country'],
          limit: 250,
          orderBys: [
            {
              dimension: {
                dimensionName: 'country',
              },
            },
          ],
        },
        {
          fieldNames: ['browser'],
          offset: 3,
          limit: 3,
          orderBys: [
            {
              metric: {
                metricName: 'sessions',
              },
              desc: true,
            },
          ],
        },
      ],
      metrics: [
        {
          name: 'sessions',
        },
      ],
      dimensions: [
        {
          name: 'country',
        },
        {
          name: 'browser',
        },
      ],
    });
    printPivotReportResponse(response);
  }

  runPivotReport();

  // Prints results of a runReport call.
  function printPivotReportResponse(response) {
    //[START analyticsdata_print_run_pivot_report_response]
    console.log('Report result:');
    response.rows.forEach(row => {
      row.dimensionValues.forEach(dimensionValue => {
        console.log(dimensionValue.value);
      });

      row.metricValues.forEach(metricValue => {
        console.log(metricValue.value);
      });
    });
    // [END analyticsdata_print_run_pivot_report_response]
  }
  // [END analyticsdata_run_pivot_report]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
