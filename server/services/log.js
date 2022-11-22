
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

module.exports.logToConsole = function (message, value, tag = "INFO") {
    var call = getCaller();
    var date = new Date();
    if (tag == "ERROR") {
        console.log(`[${date.toLocaleString()} ERROR] Error in ${call}!`);
    }
    console.log(`[${date.toLocaleString()} ${tag}] ${message}: ${value}`);
}
