/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import * as dotenv from "dotenv";
import express, {Application, Router} from "express";
import cors from "cors";
import helmet from "helmet";
import {StackUtils} from "./stack-utils";
import {logger} from "./logger";
import path from "path";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import {RegisterRoutes} from "../build/routes";
import {container} from "tsyringe";
import "reflect-metadata";
import {Db, MongoClient} from "mongodb";

// Setup App variables
dotenv.config();

// Check the environment we are deploying
const stage:string = process.env.STAGE || 'dev';

// Get the deployment configuration file location
const configFile:string = path.resolve(process.env.DEPLOY_CONFIG_FILE 
    || path.join(__dirname, '/../config/deploy-config.json'));

logger.info(`Using deployment config file at ${configFile}, Stage: ${stage}`);

// Grab deployment configuration
const deploymentConfig:{[key:string]: {[key:string]: string}} = StackUtils.getDeploymentConfig(configFile, stage);

// Is PORT set in env variables else use default value
const port = parseInt(process.env.PORT as string || (deploymentConfig.port as string | undefined || "7009"));

const apiVersion = process.env.VERSION || 'v1';

export const pathPrefix = `/api/${apiVersion}`;

logger.info(`Binding to port: ${port}`);

// Get mongodb connection parameters
const mongodbUri: string = process.env.MONGO_URI || 'mongodb://localhost:27017';
const mongodbName: string = process.env.MONGO_DB_NAME || 'urbannest';

const mongoClient = new MongoClient(mongodbUri);
mongoClient.connect().then(client => {
    
    logger.info("Connected to mongodb");

    const db = client.db(mongodbName);
    container.register<Db>(Db, {useValue: db});

    // Create the application instance
    const app:Application = express();

    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(morgan("tiny"));

    // Create a base router
    const controllerRoutes = Router();

    // Register all routes
    RegisterRoutes(controllerRoutes);

    // Mount all controller routes under the prefix /api/{version}/
    app.use(pathPrefix, controllerRoutes);

    // Enable API documentation for dev env
    if (stage === 'dev' || stage === 'test') {
        app.use(express.static("build"));

        // Dev UI team can use "/docs" to go through the exposed REST APIs, this produces a Swagger 3.0 doc
        app.use(
            `${pathPrefix}/docs`,
            swaggerUi.serve,
            swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: "/swagger.json"
                }
            })
        );
    }

    app.listen(port, () => {
        logger.info(`Server started listening on port ${port}`);
    });
});