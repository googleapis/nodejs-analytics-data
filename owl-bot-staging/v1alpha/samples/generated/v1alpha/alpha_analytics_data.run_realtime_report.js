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
  // [START data_run_realtime_report_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  A Google Analytics GA4 property identifier whose events are tracked.
   *  Specified in the URL path and not the body. To learn more, see [where to
   *  find your Property
   *  ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id).
   *  Example: properties/1234
   */
  // const property = 'abc123'
  /**
   *  The dimensions requested and displayed.
   */
  // const dimensions = 1234
  /**
   *  The metrics requested and displayed.
   */
  // const metrics = 1234
  /**
   *  The number of rows to return. If unspecified, 10 rows are returned. If
   *  -1, all rows are returned.
   */
  // const limit = 1234
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
   *  Aggregation of metrics. Aggregated metric values will be shown in rows
   *  where the dimension_values are set to "RESERVED_(MetricAggregation)".
   */
  // const metricAggregations = 1234
  /**
   *  Specifies how rows are ordered in the response.
   */
  // const orderBys = 1234
  /**
   *  Toggles whether to return the current state of this Analytics Property's
   *  Realtime quota. Quota is returned in [PropertyQuota](#PropertyQuota).
   */
  // const returnPropertyQuota = true

  // Imports the Data library
  const {AlphaAnalyticsDataClient} = require('@google-analytics/data').v1alpha;

  // Instantiates a client
  const dataClient = new AlphaAnalyticsDataClient();

  async function runRealtimeReport() {
    // Construct request
    const request = {
    };

    // Run request
    const response = await dataClient.runRealtimeReport(request);
    console.log(response);
  }

  runRealtimeReport();
  // [END data_run_realtime_report_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
