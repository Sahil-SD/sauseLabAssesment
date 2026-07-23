const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logDirectory = 'logs';

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory, { recursive: true });
}

const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} | ${level.toUpperCase()} | ${message}`;
    })
);

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',

    format: logFormat,

    transports: [

        // Console logs
        new winston.transports.Console(),

        // Complete automation logs
        new winston.transports.File({
            filename: path.join(logDirectory, 'automation.log')
        }),

        // Error logs only
        new winston.transports.File({
            filename: path.join(logDirectory, 'error.log'),
            level: 'error'
        })

    ]
});

module.exports = logger;