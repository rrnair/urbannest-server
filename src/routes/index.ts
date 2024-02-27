/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import express from 'express';
import { defaultRoute } from './default';
import { pingRoute } from './ping';
import { propertiesRoutes } from './properties';

export const routes = express.Router();

// Add all routes here
routes.use(defaultRoute);
routes.use(pingRoute);
routes.use(propertiesRoutes)
