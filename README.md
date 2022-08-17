[//]: # "This README.md file is auto-generated, all changes to this file will be lost."
[//]: # "To regenerate it, use `python -m synthtool`."
<img src="https://avatars2.githubusercontent.com/u/2810941?v=3&s=96" alt="Google Cloud Platform logo" title="Google Cloud Platform" align="right" height="96" width="96"/>

# [Google Analytics Data: Node.js Client](https://github.com/googleapis/nodejs-analytics-data)

[![release level](https://img.shields.io/badge/release%20level-preview-yellow.svg?style=flat)](https://cloud.google.com/terms/launch-stages)
[![npm version](https://img.shields.io/npm/v/@google-analytics/data.svg)](https://www.npmjs.org/package/@google-analytics/data)




Data client for Node.js


A comprehensive list of changes in each version may be found in
[the CHANGELOG](https://github.com/googleapis/nodejs-analytics-data/blob/main/CHANGELOG.md).

* [Google Analytics Data Node.js Client API Reference][client-docs]
* [Google Analytics Data Documentation][product-docs]
* [github.com/googleapis/nodejs-analytics-data](https://github.com/googleapis/nodejs-analytics-data)

Read more about the client libraries for Cloud APIs, including the older
Google APIs Client Libraries, in [Client Libraries Explained][explained].

[explained]: https://cloud.google.com/apis/docs/client-libraries-explained

**Table of contents:**


* [Quickstart](#quickstart)
  * [Before you begin](#before-you-begin)
  * [Installing the client library](#installing-the-client-library)
  * [Using the client library](#using-the-client-library)
* [Samples](#samples)
* [Versioning](#versioning)
* [Contributing](#contributing)
* [License](#license)

## Quickstart

### Before you begin

1.  [Select or create a Cloud Platform project][projects].
1.  [Enable the Google Analytics Data API][enable_api].
1.  [Set up authentication with a service account][auth] so you can access the
    API from your local workstation.

### Installing the client library

```bash
npm install @google-analytics/data
```


### Using the client library

```javascript
/**
 * TODO(developer): Uncomment this variable and replace with your
 *   Google Analytics 4 property ID before running the sample.
 */
// propertyId = 'YOUR-GA4-PROPERTY-ID';

// Imports the Google Analytics Data API client library.
const {BetaAnalyticsDataClient} = require('@google-analytics/data');

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport() {
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '2020-03-31',
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'city',
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

runReport();

```



## Samples

Samples are in the [`samples/`](https://github.com/googleapis/nodejs-analytics-data/tree/main/samples) directory. Each sample's `README.md` has instructions for running its sample.

| Sample                      | Source Code                       | Try it |
| --------------------------- | --------------------------------- | ------ |
| Get Common Metadata | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/getCommonMetadata.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/getCommonMetadata.js,samples/README.md) |
| Get Metadata By Property Id | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/getMetadataByPropertyId.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/getMetadataByPropertyId.js,samples/README.md) |
| Quickstart | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/quickstart.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/quickstart.js,samples/README.md) |
| Quickstart_json_credentials | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/quickstart_json_credentials.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/quickstart_json_credentials.js,samples/README.md) |
| Quickstart_oauth2 | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/quickstart_oauth2.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/quickstart_oauth2.js,samples/README.md) |
| Run Batch Report | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runBatchReport.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runBatchReport.js,samples/README.md) |
| Run Pivot Report | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runPivotReport.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runPivotReport.js,samples/README.md) |
| Run Realtime Report | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runRealtimeReport.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runRealtimeReport.js,samples/README.md) |
| Run Realtime Report With Multiple Dimensions | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runRealtimeReportWithMultipleDimensions.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runRealtimeReportWithMultipleDimensions.js,samples/README.md) |
| Run Realtime Report With Multiple Metrics | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runRealtimeReportWithMultipleMetrics.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runRealtimeReportWithMultipleMetrics.js,samples/README.md) |
| Run Report | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReport.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReport.js,samples/README.md) |
| Run Report With Aggregations | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithAggregations.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithAggregations.js,samples/README.md) |
| Run Report With Cohorts | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithCohorts.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithCohorts.js,samples/README.md) |
| Run Report With Date Ranges | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithDateRanges.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithDateRanges.js,samples/README.md) |
| Run Report With Dimension And Metric Filters | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithDimensionAndMetricFilters.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithDimensionAndMetricFilters.js,samples/README.md) |
| Run Report With Dimension Exclude Filter | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithDimensionExcludeFilter.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithDimensionExcludeFilter.js,samples/README.md) |
| Run Report With Dimension Filter | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithDimensionFilter.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithDimensionFilter.js,samples/README.md) |
| Run Report With Dimension In List Filter | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithDimensionInListFilter.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithDimensionInListFilter.js,samples/README.md) |
| Run Report With Multiple Dimension Filters | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithMultipleDimensionFilters.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithMultipleDimensionFilters.js,samples/README.md) |
| Run Report With Multiple Dimensions | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithMultipleDimensions.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithMultipleDimensions.js,samples/README.md) |
| Run Report With Multiple Metrics | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithMultipleMetrics.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithMultipleMetrics.js,samples/README.md) |
| Run Report With Named Date Ranges | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithNamedDateRanges.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithNamedDateRanges.js,samples/README.md) |
| Run Report With Ordering | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithOrdering.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithOrdering.js,samples/README.md) |
| Run Report With Pagination | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithPagination.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithPagination.js,samples/README.md) |
| Run Report With Property Quota | [source code](https://github.com/googleapis/nodejs-analytics-data/blob/main/samples/runReportWithPropertyQuota.js) | [![Open in Cloud Shell][shell_img]](https://console.cloud.google.com/cloudshell/open?git_repo=https://github.com/googleapis/nodejs-analytics-data&page=editor&open_in_editor=samples/runReportWithPropertyQuota.js,samples/README.md) |



The [Google Analytics Data Node.js Client API Reference][client-docs] documentation
also contains samples.

## Supported Node.js Versions

Our client libraries follow the [Node.js release schedule](https://nodejs.org/en/about/releases/).
Libraries are compatible with all current _active_ and _maintenance_ versions of
Node.js.
If you are using an end-of-life version of Node.js, we recommend that you update
as soon as possible to an actively supported LTS version.

Google's client libraries support legacy versions of Node.js runtimes on a
best-efforts basis with the following warnings:

* Legacy versions are not tested in continuous integration.
* Some security patches and features cannot be backported.
* Dependencies cannot be kept up-to-date.

Client libraries targeting some end-of-life versions of Node.js are available, and
can be installed through npm [dist-tags](https://docs.npmjs.com/cli/dist-tag).
The dist-tags follow the naming convention `legacy-(version)`.
For example, `npm install @google-analytics/data@legacy-8` installs client libraries
for versions compatible with Node.js 8.

## Versioning

This library follows [Semantic Versioning](http://semver.org/).







This library is considered to be in **preview**. This means it is still a
work-in-progress and under active development. Any release is subject to
backwards-incompatible changes at any time.


More Information: [Google Cloud Platform Launch Stages][launch_stages]

[launch_stages]: https://cloud.google.com/terms/launch-stages

## Contributing

Contributions welcome! See the [Contributing Guide](https://github.com/googleapis/nodejs-analytics-data/blob/main/CONTRIBUTING.md).

Please note that this `README.md`, the `samples/README.md`,
and a variety of configuration files in this repository (including `.nycrc` and `tsconfig.json`)
are generated from a central template. To edit one of these files, make an edit
to its templates in
[directory](https://github.com/googleapis/synthtool).

## License

Apache Version 2.0

See [LICENSE](https://github.com/googleapis/nodejs-analytics-data/blob/main/LICENSE)

[client-docs]: https://googleapis.dev/nodejs/analytics-data/latest/index.html
[product-docs]: https://developers.google.com/analytics/trusted-testing/analytics-data
[shell_img]: https://gstatic.com/cloudssh/images/open-btn.png
[projects]: https://console.cloud.google.com/project
[billing]: https://support.google.com/cloud/answer/6293499#enable-billing
[enable_api]: https://console.cloud.google.com/flows/enableapi?apiid=analyticsdata.googleapis.com
[auth]: https://cloud.google.com/docs/authentication/getting-started
