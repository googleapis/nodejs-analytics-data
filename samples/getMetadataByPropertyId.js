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

/** Google Analytics Data API sample application retrieving dimension and metrics
metadata.

See https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/getMetadata
for more information.

 Before you start the application, please review the comments starting with
 "TODO(developer)" and update the code to use correct values.

 Usage:
 npm install
 node getMetadataByPropertyId.js
 */

function main(propertyId = 'YOUR-GA4-PROPERTY-ID') {
  // [START analyticsdata_get_metadata_by_property_id]

  // TODO(developer): Uncomment this variable and replace with your
  // Google Analytics 4 property ID before running the sample.
  // propertyId = 'YOUR-GA4-PROPERTY-ID';

  // Imports the Google Analytics Data API client library.
  const {BetaAnalyticsDataClient} = require('@google-analytics/data');

  // Initialize client that will be used to send requests. This client only
  // needs to be created once, and can be reused for multiple requests.
  const analyticsDataClient = new BetaAnalyticsDataClient();

  // Retrieves dimensions and metrics available for a Google Analytics 4
  // property, including custom fields.
  async function getMetadataByPropertyId() {
    const [response] = await analyticsDataClient.getMetadata({
      name: `properties/${propertyId}/metadata`,
    });
    console.log(
      `Dimensions and metrics available for a Google Analytics 4 property ${propertyId} (including custom fields):`
    );
    printGetMetadataResponse(response);
  }

  getMetadataByPropertyId();

  // Prints results of the getMetadata call.
  function printGetMetadataResponse(response) {
    //[START analyticsdata_print_get_metadata_response]
    response.dimensions.forEach(dimension => {
      console.log('DIMENSION');
      console.log(
        `${dimension.apiName} (${dimension.uiName}): ${dimension.description}`
      );
      console.log(`custom definition: ${dimension.customDefinition}`);
      if (
        dimension.deprecatedApiNames &&
        dimension.deprecatedApiNames.length > 0
      ) {
        console.log(`Deprecated API names: ${dimension.deprecatedApiNames}`);
      }
      console.log();
    });

    response.metrics.forEach(metric => {
      console.log('METRIC');
      console.log(
        `${metric.apiName} (${metric.uiName}): ${metric.description}`
      );
      console.log(`custom definition: ${metric.customDefinition}`);
      if (metric.expression) {
        console.log(`Expression: ${metric.expression}`);
      }
      console.log(`Type: ${metric.type}`);
      if (metric.deprecatedApiNames && metric.deprecatedApiNames.length > 0) {
        console.log(`Deprecated API names: ${metric.deprecatedApiNames}`);
      }
      console.log();
    });
    // [END analyticsdata_print_get_metadata_response]
  }
  // [END analyticsdata_get_metadata_by_property_id]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
