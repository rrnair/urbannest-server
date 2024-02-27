/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { Request, Response, Router } from 'express';
import { logger } from '../logger';


export const defaultRoute = Router();

defaultRoute.get('/', (request:Request, ressponse:Response) => {
    logger.info("Hit default route /");
    ressponse.send("What's up ?!");
});