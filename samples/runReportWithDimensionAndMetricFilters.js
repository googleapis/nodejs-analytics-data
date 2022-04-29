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
dimension and metric filters in a report.

See https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport#body.request_body.FIELDS.dimension_filter
for more information.

 Before you start the application, please review the comments starting with
 "TODO(developer)" and update the code to use correct values.

 Usage:
 npm install
 node runReportWithDimensionAndMetricFilters.js
 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
  // [START analyticsdata_run_report_with_dimension_and_metric_filters]

  // TODO(developer): Uncomment this variable and replace with your 
  // Google Analytics 4 property ID before running the sample.
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  // Initialize client that will be used to send requests. This client only 
  // needs to be created once, and can be reused for multiple requests.
  const analyticsDataClient = new BetaAnalyticsDataClient();

  // Runs a report using both metric and dimension filters. A dimension filter
  // limits the report to include only users who made an in-app purchase using
  // Android platform. A metric filter specifies that only users with session
  // counts larger than 1,000 should be included.
  async function runReportWithDimensionAndMetricFilters() {
    const [response] = await analyticsDataClient.runReport({
      property: "properties/${propertyId}",
      dimensions: [
        {
          name: "country"
        }
      ],
      metrics: [
        {
          name: "activeUsers"
        }
      ],
      dateRanges: [
        {
          startDate: "2020-09-01",
          endDate: "2020-09-15"
        }
      ]
    });
  }

  function printRunReportResponse(response) {
// Print function here
    return response;
  }

  runReport();
  // [END analyticsdata_run_report_with_dimension_and_metric_filters]
}


process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
