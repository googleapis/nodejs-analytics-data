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

'use strict';

const cp = require('child_process');
const {assert} = require('chai');
const {describe, it} = require('mocha');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const GA4_PROPERTY_ID = process.env.GA4_PROPERTY_ID || '222596558';

describe('Report with dimension exclude filter', () => {
  it('should run a report using a filter with `not_expression`', async () => {
    // eslint-disable-next-line no-unused-vars
    const stdout = execSync(
      `node ./runReportWithDimensionExcludeFilter.js ${GA4_PROPERTY_ID}`
    );
    assert.match(stdout, /Report result/);
  });
});
