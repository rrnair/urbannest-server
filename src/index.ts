/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import * as dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { StackUtils } from "./stack-utils";
import { logger } from "./logger";
import path from "path";
import { routes } from "./routes";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

// Setup App variables
dotenv.config();


// Check the environment we are deploying
const stage:string = process.env.STAGE || 'dev';

// Get the deployment configuration file location
const configFile:string = path.resolve(process.env.DEPLOY_CONFIG_FILE || path.join(__dirname, '/../config/deploy-config.json'));

logger.info(`Using deployment config file at ${configFile}, Stage: ${stage}`);

// Grab deployment configuration
const deploymentConfig:{[key:string]: {[key:string]: string}} = StackUtils.getDeploymentConfig(configFile, stage);

// Is PORT set in env variables else use default value
const port = parseInt(process.env.PORT as string || (deploymentConfig.port as string | undefined || "7009"));

logger.info(`Binding to port: ${port}`);

// Create the application instance
const app:Application = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// Enable API documentation for dev env
if (stage === 'dev' || stage === 'test') {
    app.use(express.static("api-docs"));

    // Dev UI team can use "/docs" to go through the exposed REST APIs, this produces a Swagger 3.0 doc
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: "/swagger.json"
            }
        })
    );
}

// Setup routes
app.use('/', routes);

app.listen(port, () => {
    logger.info(`Server started listening on port ${port}`);
});

