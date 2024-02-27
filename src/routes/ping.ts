/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { Request, Response, Router } from 'express';
import { logger } from '../logger';
import { PingController } from '../controllers/ping-controller';


export const pingRoute = Router();

pingRoute.get('/ping', async (request:Request, response:Response) => {
    logger.info(`Ping from: ${request.headers}`);
    const controller = new PingController();
    response.send(await controller.get());
});