/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { Request, Response, Router } from 'express';
import { logger } from '../logger';
import { PropertyListController } from '../controllers/property-controller';
import { PropertyStatus, PropertyCategory } from '../types/stack-types';

/**
 * Routes that are exposed for listing properties
 */

export const propertiesRoutes = Router();


/** Get all available properties */
propertiesRoutes.get('/props/all', async (request:Request, response:Response) => {
    logger.info(`Property - all list request from: ${request.headers}`);
    const controller = new PropertyListController();
    response.send(await controller.getAll());
});


/** Get properties by its category type and completion status */
propertiesRoutes.get('/props/:category/:status', async (request:Request, response:Response) => {
    logger.info(`Property list by category ${request.params.category}, status ${request.params.status}`);
    const controller = new PropertyListController();
    response.send(await controller.getByFilter(
        request.params.category as PropertyCategory, request.params.status as PropertyStatus));
});
