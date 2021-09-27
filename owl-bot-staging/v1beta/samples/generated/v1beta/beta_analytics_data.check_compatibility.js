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
  // [START data_v1beta_generated_BetaAnalyticsData_CheckCompatibility_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  A Google Analytics GA4 property identifier whose events are tracked. To
   *  learn more, see [where to find your Property
   *  ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id).
   *  `property` should be the same value as in your `runReport` request.
   *  Example: properties/1234
   *  Set the Property ID to 0 for compatibility checking on dimensions and
   *  metrics common to all properties. In this special mode, this method will
   *  not return custom dimensions and metrics.
   */
  // const property = 'abc123'
  /**
   *  The dimensions in this report. `dimensions` should be the same value as in
   *  your `runReport` request.
   */
  // const dimensions = 1234
  /**
   *  The metrics in this report. `metrics` should be the same value as in your
   *  `runReport` request.
   */
  // const metrics = 1234
  /**
   *  The filter clause of dimensions. `dimensionFilter` should be the same value
   *  as in your `runReport` request.
   */
  // const dimensionFilter = ''
  /**
   *  The filter clause of metrics. `metricFilter` should be the same value as in
   *  your `runReport` request
   */
  // const metricFilter = ''
  /**
   *  Filters the dimensions and metrics in the response to just this
   *  compatibility. Commonly used as `”compatibilityFilter”: “COMPATIBLE”`
   *  to only return compatible dimensions & metrics.
   */
  // const compatibilityFilter = ''

  // Imports the Data library
  const {BetaAnalyticsDataClient} = require('@google-analytics/data').v1beta;

  // Instantiates a client
  const dataClient = new BetaAnalyticsDataClient();

  async function checkCompatibility() {
    // Construct request
    const request = {
    };

    // Run request
    const response = await dataClient.checkCompatibility(request);
    console.log(response);
  }

  checkCompatibility();
  // [END data_v1beta_generated_BetaAnalyticsData_CheckCompatibility_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
