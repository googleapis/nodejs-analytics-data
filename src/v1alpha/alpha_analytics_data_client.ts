// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

/* global window */
import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions} from 'google-gax';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v1alpha/alpha_analytics_data_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './alpha_analytics_data_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Google Analytics reporting data service.
 * @class
 * @memberof v1alpha
 */
export class AlphaAnalyticsDataClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  warn: (code: string, message: string, warnType?: string) => void;
  innerApiCalls: {[name: string]: Function};
  alphaAnalyticsDataStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of AlphaAnalyticsDataClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean | "rest"} [options.fallback] - Use HTTP fallback mode.
   *     Pass "rest" to use HTTP/1.1 REST API instead of gRPC.
   *     For more information, please check the
   *     {@link https://github.com/googleapis/gax-nodejs/blob/main/client-libraries.md#http11-rest-api-mode documentation}.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof AlphaAnalyticsDataClient;
    const servicePath =
      opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    this._providedCustomServicePath = !!(
      opts?.servicePath || opts?.apiEndpoint
    );
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback =
      opts?.fallback ??
      (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = this._gaxGrpc.auth as gax.GoogleAuth;

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = staticMembers.servicePath;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [`gax/${this._gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest') {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
      'google.analytics.data.v1alpha.AlphaAnalyticsData',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = gax.warn;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.alphaAnalyticsDataStub) {
      return this.alphaAnalyticsDataStub;
    }

    // Put together the "service stub" for
    // google.analytics.data.v1alpha.AlphaAnalyticsData.
    this.alphaAnalyticsDataStub = this._gaxGrpc.createStub(
      this._opts.fallback
        ? (this._protos as protobuf.Root).lookupService(
            'google.analytics.data.v1alpha.AlphaAnalyticsData'
          )
        : // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.analytics.data.v1alpha
            .AlphaAnalyticsData,
      this._opts,
      this._providedCustomServicePath
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const alphaAnalyticsDataStubMethods = ['runFunnelReport'];
    for (const methodName of alphaAnalyticsDataStubMethods) {
      const callPromise = this.alphaAnalyticsDataStub.then(
        stub =>
          (...args: Array<{}>) => {
            if (this._terminated) {
              return Promise.reject('The client has already been closed.');
            }
            const func = stub[methodName];
            return func.apply(stub, args);
          },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const descriptor = undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.alphaAnalyticsDataStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'analyticsdata.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'analyticsdata.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/analytics',
      'https://www.googleapis.com/auth/analytics.readonly',
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  /**
   * Returns a customized funnel report of your Google Analytics event data. The
   * data returned from the API is as a table with columns for the requested
   * dimensions and metrics.
   *
   * Funnel exploration lets you visualize the steps your users take to complete
   * a task and quickly see how well they are succeeding or failing at each
   * step. For example, how do prospects become shoppers and then become buyers?
   * How do one time buyers become repeat buyers? With this information, you can
   * improve inefficient or abandoned customer journeys. To learn more, see [GA4
   * Funnel Explorations](https://support.google.com/analytics/answer/9327974).
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.property
   *   A Google Analytics GA4 property identifier whose events are tracked.
   *   Specified in the URL path and not the body. To learn more, see [where to
   *   find your Property
   *   ID](https://developers.google.com/analytics/devguides/reporting/data/v1/property-id).
   *   Within a batch request, this property should either be unspecified or
   *   consistent with the batch-level property.
   *
   *   Example: properties/1234
   * @param {number[]} request.dateRanges
   *   Date ranges of data to read. If multiple date ranges are requested, each
   *   response row will contain a zero based date range index. If two date
   *   ranges overlap, the event data for the overlapping days is included in the
   *   response rows for both date ranges.
   * @param {google.analytics.data.v1alpha.Funnel} request.funnel
   *   The configuration of this request's funnel. This funnel configuration is
   *   required.
   * @param {google.analytics.data.v1alpha.FunnelBreakdown} request.funnelBreakdown
   *   If specified, this breakdown adds a dimension to the funnel table sub
   *   report response. This breakdown dimension expands each funnel step to the
   *   unique values of the breakdown dimension. For example, a breakdown by the
   *   `deviceCategory` dimension will create rows for `mobile`, `tablet`,
   *   `desktop`, and the total.
   * @param {google.analytics.data.v1alpha.FunnelNextAction} request.funnelNextAction
   *   If specified, next action adds a dimension to the funnel visualization sub
   *   report response. This next action dimension expands each funnel step to the
   *   unique values of the next action. For example a next action of the
   *   `eventName` dimension will create rows for several events (i.e.
   *   `session_start` & `click`) and the total.
   *
   *   Next action only supports `eventName` and most Page / Screen dimensions
   *   like `pageTitle` and `pagePath`.
   * @param {google.analytics.data.v1alpha.RunFunnelReportRequest.FunnelVisualizationType} request.funnelVisualizationType
   *   The funnel visualization type controls the dimensions present in the funnel
   *   visualization sub report response. If not specified, `STANDARD_FUNNEL` is
   *   used.
   * @param {number[]} request.segments
   *   The configurations of segments. Segments are subsets of a property's data.
   *   In a funnel report with segments, the funnel is evaluated in each segment.
   *
   *   Each segment specified in this request
   *   produces a separate row in the response; in the response, each segment
   *   identified by its name.
   *
   *   The segments parameter is optional. Requests are limited to 4 segments.
   * @param {number} request.limit
   *   The number of rows to return. If unspecified, 10,000 rows are returned. The
   *   API returns a maximum of 100,000 rows per request, no matter how many you
   *   ask for. `limit` must be positive.
   *
   *   The API can also return fewer rows than the requested `limit`, if there
   *   aren't as many dimension values as the `limit`.
   * @param {google.analytics.data.v1alpha.FilterExpression} request.dimensionFilter
   *   Dimension filters allow you to ask for only specific dimension values in
   *   the report. To learn more, see [Creating a Report: Dimension
   *   Filters](https://developers.google.com/analytics/devguides/reporting/data/v1/basics#dimension_filters)
   *   for examples. Metrics cannot be used in this filter.
   * @param {boolean} request.returnPropertyQuota
   *   Toggles whether to return the current state of this Analytics Property's
   *   quota. Quota is returned in [PropertyQuota](#PropertyQuota).
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [RunFunnelReportResponse]{@link google.analytics.data.v1alpha.RunFunnelReportResponse}.
   *   Please see the
   *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
   *   for more details and examples.
   * @example <caption>include:samples/generated/v1alpha/alpha_analytics_data.run_funnel_report.js</caption>
   * region_tag:analyticsdata_v1alpha_generated_AlphaAnalyticsData_RunFunnelReport_async
   */
  runFunnelReport(
    request?: protos.google.analytics.data.v1alpha.IRunFunnelReportRequest,
    options?: CallOptions
  ): Promise<
    [
      protos.google.analytics.data.v1alpha.IRunFunnelReportResponse,
      protos.google.analytics.data.v1alpha.IRunFunnelReportRequest | undefined,
      {} | undefined
    ]
  >;
  runFunnelReport(
    request: protos.google.analytics.data.v1alpha.IRunFunnelReportRequest,
    options: CallOptions,
    callback: Callback<
      protos.google.analytics.data.v1alpha.IRunFunnelReportResponse,
      | protos.google.analytics.data.v1alpha.IRunFunnelReportRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  runFunnelReport(
    request: protos.google.analytics.data.v1alpha.IRunFunnelReportRequest,
    callback: Callback<
      protos.google.analytics.data.v1alpha.IRunFunnelReportResponse,
      | protos.google.analytics.data.v1alpha.IRunFunnelReportRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): void;
  runFunnelReport(
    request?: protos.google.analytics.data.v1alpha.IRunFunnelReportRequest,
    optionsOrCallback?:
      | CallOptions
      | Callback<
          protos.google.analytics.data.v1alpha.IRunFunnelReportResponse,
          | protos.google.analytics.data.v1alpha.IRunFunnelReportRequest
          | null
          | undefined,
          {} | null | undefined
        >,
    callback?: Callback<
      protos.google.analytics.data.v1alpha.IRunFunnelReportResponse,
      | protos.google.analytics.data.v1alpha.IRunFunnelReportRequest
      | null
      | undefined,
      {} | null | undefined
    >
  ): Promise<
    [
      protos.google.analytics.data.v1alpha.IRunFunnelReportResponse,
      protos.google.analytics.data.v1alpha.IRunFunnelReportRequest | undefined,
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers['x-goog-request-params'] =
      gax.routingHeader.fromParams({
        property: request.property || '',
      });
    this.initialize();
    return this.innerApiCalls.runFunnelReport(request, options, callback);
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    if (this.alphaAnalyticsDataStub && !this._terminated) {
      return this.alphaAnalyticsDataStub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
