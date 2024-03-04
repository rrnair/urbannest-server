
import {StackUtils} from "../../src/stack-utils";
import {Database} from "../../src/db";
import * as dotenv from "dotenv";
import path from "path";
import {Mongoose} from "mongoose";
import {logger} from "../../src/logger";


export async function setup() {

    dotenv.config();

    const deploymentConfig = StackUtils
        .getDeploymentConfig(path.join(__dirname, '../../config/deploy-config.json'), 'test');
    
    return await new Database(
        deploymentConfig.test?.mongodbUri || '', deploymentConfig.test?.mongodbName || '').init();   
}

export async function tearDown (database: Mongoose) {
    logger.info("Tearing down mongodb");

    const {property, enquiry}  = database.connection.collections;
    await property?.drop();
    await enquiry?.drop();
    database.connection.close;
}