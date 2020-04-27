const loggers = require("../loggers");
const uuidv4 = require("uuid/v4");

/*
 * Exec shell script
 */
const execSync = require('child_process').execSync;
// import { execSync } from 'child_process';  // replace ^ if using ES modules
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function execCmd(cmd) {
  try {
	  const { stdout, stderr } = await exec(cmd);
	  return stdout.toString();
  } catch (err) {
	  return err.stdout.toString();
  }
}

/*
Salesforce Platform Event-driven function.

Input event: `Heroku_Function_Generate_UUID_Invoke__e`
Output event: `Heroku_Function_Generate_UUID_Return__e`
*/
module.exports = function (payload, logger = loggers.default) {
    logger(`       ❄️  Generate_UUID for ${payload.Context_Id__c}`);

	let uuid = uuidv4();
	let cmd = 'ls -al';

    const res = await exec(cmd);
    logger("script res = ");
	logger(res);

    // Return the payload expected by the Return event's schema
    return {
        // Must always pass Context ID through unchanged.
        Context_Id__c: payload.Context_Id__c

		,Value__c: uuidv4()
        ,Payload__c: res
    };
};
