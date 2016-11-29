# Get Missing Environment Variables

[![Build Status](https://secure.travis-ci.org/rmtsrc/get-missing-env-vars.png)](http://travis-ci.org/rmtsrc/get-missing-env-vars?branch=master)

Returns an array of missing environment variables.

Can be used to check that your application has the right environment variables set before runtime errors occur.

## Usage

`npm install --save get-missing-env-vars`

Configuration takes an object of arrays:
 * `*` which checks that the environment variables are set on all environments
 * `YOUR_ENV` which will only check that the environment variables are missing when your application has `NODE_ENV` set to `YOUR_ENV`
 * `!YOUR_ENV` which will only check that the environment variables are missing when your application does not have `NODE_ENV` set to `YOUR_ENV`

Example use case:
```js
const getMissingEnvVars = require('get-missing-env-vars');

const requiredEnvConfig = {
  '*': ['NODE_ENV', 'PORT', 'HOST', 'API_URL'],
  'development': ['DEBUG_PATH']
  '!development': ['NODE_HTTP_USER', 'NODE_HTTP_PASS']
};

const missingEnvVars = getMissingEnvVars(requiredEnvConfig);
if (missingEnvVars.length > 0) {
  throw new Error(`The following required environment variables are missing and need to be set before starting the app: ${missingEnvVars.join(', ')}`);
}
```
