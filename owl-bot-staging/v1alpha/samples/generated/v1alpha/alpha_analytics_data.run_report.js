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

function main() {
  // [START data_v1alpha_generated_AlphaAnalyticsData_RunReport_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  A property whose events are tracked. Within a batch request, this entity
   *  should either be unspecified or consistent with the batch-level entity.
   */
  // const entity = ''
  /**
   *  The dimensions requested and displayed.
   */
  // const dimensions = 1234
  /**
   *  The metrics requested and displayed.
   */
  // const metrics = 1234
  /**
   *  Date ranges of data to read. If multiple date ranges are requested, each
   *  response row will contain a zero based date range index. If two date
   *  ranges overlap, the event data for the overlapping days is included in the
   *  response rows for both date ranges. In a cohort request, this `dateRanges`
   *  must be unspecified.
   */
  // const dateRanges = 1234
  /**
   *  The row count of the start row. The first row is counted as row 0.
   *  To learn more about this pagination parameter, see
   *  [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).
   */
  // const offset = 1234
  /**
   *  The number of rows to return. If unspecified, 10 rows are returned. If
   *  -1, all rows are returned.
   *  To learn more about this pagination parameter, see
   *  [Pagination](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#pagination).
   */
  // const limit = 1234
  /**
   *  Aggregation of metrics. Aggregated metric values will be shown in rows
   *  where the dimension_values are set to "RESERVED_(MetricAggregation)".
   */
  // const metricAggregations = 1234
  /**
   *  The filter clause of dimensions. Dimensions must be requested to be used in
   *  this filter. Metrics cannot be used in this filter.
   */
  // const dimensionFilter = ''
  /**
   *  The filter clause of metrics. Applied at post aggregation phase, similar to
   *  SQL having-clause. Metrics must be requested to be used in this filter.
   *  Dimensions cannot be used in this filter.
   */
  // const metricFilter = ''
  /**
   *  Specifies how rows are ordered in the response.
   */
  // const orderBys = 1234
  /**
   *  A currency code in ISO4217 format, such as "AED", "USD", "JPY".
   *  If the field is empty, the report uses the entity's default currency.
   */
  // const currencyCode = 'abc123'
  /**
   *  Cohort group associated with this request. If there is a cohort group
   *  in the request the 'cohort' dimension must be present.
   */
  // const cohortSpec = ''
  /**
   *  If false or unspecified, each row with all metrics equal to 0 will not be
   *  returned. If true, these rows will be returned if they are not separately
   *  removed by a filter.
   */
  // const keepEmptyRows = true
  /**
   *  Toggles whether to return the current state of this Analytics Property's
   *  quota. Quota is returned in [PropertyQuota](#PropertyQuota).
   */
  // const returnPropertyQuota = true

  // Imports the Data library
  const {AlphaAnalyticsDataClient} = require('@google-analytics/data').v1alpha;

  // Instantiates a client
  const dataClient = new AlphaAnalyticsDataClient();

  async function runReport() {
    // Construct request
    const request = {
    };

    // Run request
    const response = await dataClient.runReport(request);
    console.log(response);
  }

  runReport();
  // [END data_v1alpha_generated_AlphaAnalyticsData_RunReport_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
