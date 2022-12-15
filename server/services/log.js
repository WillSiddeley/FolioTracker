
// This js file will contain generic logging functions that will be used throughout this project

// This function is for getting the filename of the caller of a function
function getCaller() {
    var fileName;
    var pst = Error.prepareStackTrace
    Error.prepareStackTrace = function (err, stack) { return stack; };
    try {
        var err = new Error();
        var callerFile;
        var currentFile;
        currentFile = err.stack.shift().getFileName();
        while(err.stack.length) {
            callerFile = err.stack.shift().getFileName();
            if (currentFile !== callerFile) {
                fileName = callerFile;
                break;
            }
        }
    } catch (err) { }
    Error.prepareStackTrace = pst;
    return fileName;
}

/**
 * Message format - [time TAG] MESSAGE: VALUE
 * @param {String} message A string to display before the colon (:)
 * @param {String} value A string to display after the color (:)
 * @param {String} tag A tag that goes next to the timestamp, should be either INFO, WARN, ERROR
 */
module.exports.logToConsole = function (message, value, tag = "INFO") {
    var call = getCaller();
    var date = new Date();
    // Strip newlines
    value = value.toString().replace('\n', '');
    if (tag == "ERROR") {
        console.log(`[${date.toLocaleString()} ERROR] Error in ${call}!`);
    }
    console.log(`[${date.toLocaleString()} ${tag}] ${message}: ${value}`);
}
