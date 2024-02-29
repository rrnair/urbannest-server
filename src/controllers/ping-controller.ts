/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */


import { Route, Get } from "tsoa";
import {PingResponse} from '../types/stack-types';

/**
 * A tiny route to let clients check whether this server service 
 * is up and running or not. This is optional and may be used for heartbeat checks.
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@Route("ping")
export class PingController {

    /**
     * If the request is handled in this method means, the service is alive.
     * @returns A message 
     */
    @Get("/")
    public async ping(): Promise<PingResponse> {
        return {
            message: "Yeah, I am listening"
        }       
    }

}
