/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import * as filesystem from 'fs';
import {logger} from './logger';


/**
 * A set of hekper routines
 * 
 * @author Ratheesh Nair
 * @version 1.0
 */
export class StackUtils {


    /**
     * Load deployment-config.json and fetch environment attributes. The deployment-config.json
     * specifies a set of values for each environment like prod, test, development etc.
     * The environment can be set via DEPLOYMENT_TYPE environment variable set into the shell.
     *
     * @param configFile directory path that contains `deployment-config.json`
     * @returns  Key/value pairs - environment configuration
     */
     static getDeploymentConfig(configFile:string, stage:string): {[key:string]: string} {

        // Does the file exists in the path
        if (! filesystem.existsSync(configFile)) {
            logger.error(`Deployment configuration file not found !, was expecting file: ${configFile} `);

            // Cant proceed without an enviroment set
            throw new Error(`Deployment config missing, unable to find file:  ${configFile}`);
        }

        // Load the file, this is a JSON file that contains attributes for each of the environment
        const environments = JSON.parse(filesystem.readFileSync(configFile, 'utf-8').toString());
        const env = environments[stage];

        if (! env) {
            logger.error(`Deployment configuration for stage ${stage} not Found ! in file: ${configFile}`);

            // Cant proceed, none of the configuration matched for specified environment
            throw new Error(`Deployment configuration not found at ${configFile} for Stage: ${stage}`);
        }
        return env;
    }
}