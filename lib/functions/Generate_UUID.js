const loggers = require("../loggers");
const uuidv4 = require("uuid/v4");

/*
 * Exec shell script
 */
/*
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result["default"] = mod;
        return result;
	};
*/
const child_process = require("child_process");
//const util = __importStar(require("util"));
//const execProm = util.promisify(child_process.exec);
function exec2String(cmd, options = {}) {
	const logger = loggers.default
    try {
        const results = child_process.exec(cmd, options);
		logger(results.stdout);
        return results.stdout;
    } catch (err) {
        // console.log(err);
		logger(err.stdout);
        return err.stdout;
    }
};

/*
Salesforce Platform Event-driven function.

Input event: `Heroku_Function_Generate_UUID_Invoke__e`
Output event: `Heroku_Function_Generate_UUID_Return__e`
*/
module.exports = function (payload, logger = loggers.default) {
    logger(`       ❄️  Generate_UUID for ${payload.Context_Id__c}`);

    let res = exec2String("pwd; ls -al");
    logger("script res = ");
	logger(res);
    console.log("script res = ");
	console.log(res)

    // Return the payload expected by the Return event's schema
    return {
        // Must always pass Context ID through unchanged.
        Context_Id__c: payload.Context_Id__c,
        // Additional return values as defined by the Return event.
        //Value__c: uuidv4()
        Value__c: res,
    };
};
