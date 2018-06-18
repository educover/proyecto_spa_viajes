const AppRoot = require('app-root-path');
const Winston = require('winston');
let options = {
 file: {
   level: 'info',
   filename: `${AppRoot}/logs/app.log`,
   handleExceptions: true,
   json: true,
   maxsize: 5242880, // 5MB
   maxFiles: 5,
   colorize: false,
 },
 console: {
   level: 'debug',
   handleExceptions: true,
   json: false,
   colorize: true,
 },
};
let logger = Winston.createLogger({
 transports: [
   new Winston.transports.File(options.file),
   new Winston.transports.Console(options.console)
 ],
 exitOnError: false,
});
logger.stream = {
 write: function(message, encoding) {
   // use the 'info' log level so the output will be picked up by both transports (file and console)
   logger.info(message);
 },
};
module.exports = logger;