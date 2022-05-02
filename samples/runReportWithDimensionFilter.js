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
 node runReportWithDimensionFilter.js
 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
  // [START analyticsdata_run_report_with_dimension_filter]

  // TODO(developer): Uncomment this variable and replace with your
  // Google Analytics 4 property ID before running the sample.
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  // Initialize client that will be used to send requests. This client only
  // needs to be created once, and can be reused for multiple requests.
  const analyticsDataClient = new BetaAnalyticsDataClient();

  // Runs a report using a dimension filter. The call returns a time series
  // report of `eventCount` when `eventName` is `first_open` for each date.

  // This sample uses relative date range values. See
  // https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/DateRange
  // for more information.
  async function runReportWithDimensionFilter() {
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dimensions: [
        {
          name: 'date',
        },
      ],
      metrics: [
        {
          name: 'eventCount',
        },
      ],
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'yesterday',
        },
      ],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            value: 'first_open',
          },
        },
      },
    });
    printRunReportResponse(response);
  }

  runReportWithDimensionFilter();

  // Prints results of a runReport call.
  function printRunReportResponse(response) {
    //[START analyticsdata_print_run_report_response_header]
    console.log(`${response.rowCount} rows received`);
    response.dimensionHeaders.forEach(dimensionHeader => {
      console.log(`Dimension header name: ${dimensionHeader.name}`);
    });
    response.metricHeaders.forEach(metricHeader => {
      console.log(
        `Metric header name: ${metricHeader.name} (${metricHeader.type})`
      );
    });
    //[END analyticsdata_print_run_report_response_header]

    // [START analyticsdata_print_run_report_response_rows]
    console.log('Report result:');
    response.rows.forEach(row => {
      console.log(
        `${row.dimensionValues[0].value}, ${row.metricValues[0].value}`
      );
    });
    // [END analyticsdata_print_run_report_response_rows]
  }
  // [END analyticsdata_run_report_with_dimension_filter]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
