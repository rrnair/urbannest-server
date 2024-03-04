/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */
import "reflect-metadata";
import {logger} from "./logger";
import {Database} from "./db";
import {container} from "tsyringe";
import {EnquiryModel, PropertyModel} from "./model/schema";
import {Server} from "./server";
import * as dotenv from "dotenv";
import path from "path";
import {StackUtils} from "./stack-utils";

// Setup App variables
dotenv.config();

logger.info(`Stage: ${process.env.STAGE}`);
// Check the environment we are deploying
const stage:string = process.env.STAGE || 'dev';

// Get the deployment configuration file location
const configFile:string = path.resolve(process.env.DEPLOY_CONFIG_FILE 
    || path.join(__dirname, '/../config/deploy-config.json'));

logger.info(`Using deployment config file at ${configFile}, Stage: ${stage}`);

// Grab deployment configuration
const deploymentConfig = StackUtils.getDeploymentConfig(configFile, stage);

logger.info(`config: ${deploymentConfig.test} ${deploymentConfig.mongodbUri}`);

// Get mongodb connection parameters
const mongodbUri: string = deploymentConfig.mongodbUri || 'mongodb://localhost:27017';
const mongodbName: string = deploymentConfig.mongodbName || 'urbannest';

export const database = new Database(mongodbUri, mongodbName).init();

database.then(() => {
    logger.info("Connected to database");
})
.catch(e => {
    logger.error(`Failed to connect to database - ${e}`)
});

container.registerInstance<typeof PropertyModel>("PropertyModel", PropertyModel);    
container.registerInstance<typeof EnquiryModel>("EnquiryModel", EnquiryModel);    

// Start server
export const application = new Server().start(stage, deploymentConfig);