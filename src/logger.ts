/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import {createLogger, format, transports} from 'winston';


/**
 * Setup logging mechanism for the project.
 * 
 * @author Ratheesh Nair
 * @version 1.0
 */
// Construct winston logger for cdk module. Lambda and application logs can be implemented
// using `lambda-log` library
const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({timestamp, level, message}) => {
            return `[${timestamp}] ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.File({
            dirname: 'logs',
            filename: 'urban.log'
        }),
        new transports.Console()
    ],
    defaultMeta: {service: 'azuma-server'}
});

// Export logger
export {logger};