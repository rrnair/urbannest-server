

import express, {Application, Router} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import {RegisterRoutes} from "../build/routes";
import {logger} from "./logger";



export class Server {

    public start(env: string, deploymentConfig: {[key:string]: string}): Application {

        // Is PORT set in env variables else use default value
        const port = parseInt(process.env.PORT as string || (deploymentConfig.port as string | undefined || "7009"));

        const apiVersion = process.env.VERSION || 'v1';

        const pathPrefix = `/api/${apiVersion}`;

        // Create the application instance
        const server:Application = express();

        server.use(helmet());
        server.use(cors());
        server.use(express.json());
        server.use(morgan("tiny"));

        // Create a base router
        const controllerRoutes = Router();

        // Register all routes
        RegisterRoutes(controllerRoutes);

        // Mount all controller routes under the prefix /api/{version}/
        server.use(pathPrefix, controllerRoutes);

        // Enable API documentation for dev env
        if (env === 'dev' || env === 'test') {
            server.use(express.static("build"));

            // Dev UI team can use "/docs" to go through the exposed REST APIs, this produces a Swagger 3.0 doc
            server.use(
                `${pathPrefix}/docs`,
                swaggerUi.serve,
                swaggerUi.setup(undefined, {
                    swaggerOptions: {
                        url: "/swagger.json"
                    }
                })
            );
            logger.info(`Swagger Docs are enabled at path with ${pathPrefix}/docs`);
        }

        server.listen(port, () => {
            logger.info(`REST API Path starts with ${pathPrefix}`);
            logger.info(`Server started listening on port ${port}`);
        });

        return server;
    }
}
