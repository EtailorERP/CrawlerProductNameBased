var winston = require('winston');
winston.emitErrs = true;

function formatter(args) {
  var logMessage = args.message+','+new Date().toLocaleTimeString();
  return logMessage;
}

  winston.loggers.add('userViews', {
    console: {
      level: 'info',
      colorize: true,
      label: 'category one'
    },
    file: {
      filename: './db/userViews.csv',
	  maxsize: 100, //100B
	  maxFiles: 5,
	  json: false,
	  formatter : formatter
    }
  });
  winston.loggers.add('userLikes', {
    console: {
      level: 'info',
      colorize: true,
      label: 'category one',
	  maxsize: 100, //100B
	  maxFiles: 5,
    },
    file: {
      filename: './db/userLikes.csv'
    }
  });
 

// var logger = new winston.Logger({
    // transports: [
        // new winston.transports.File({
            // level: 'info',
            // filename: './db/userViews.csv',
            // handleExceptions: true,
            // json: false,
            // maxsize: 100, //100B
            // maxFiles: 5,
            // colorize: false
        // }),
        // new winston.transports.Console({
            // level: 'debug',
            // handleExceptions: true,
            // json: false,
            // colorize: true
        // })
    // ],
    // exitOnError: false
// });

module.exports.winston = winston;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};