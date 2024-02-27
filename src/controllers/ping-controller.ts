/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */


import { Route, Get } from "tsoa";
import {PingResponse} from '../types/stack-types';


@Route("ping")
export class PingController {

    @Get("/")
    public async get (): Promise<PingResponse> {
        return {
            message: "Yeah, I am listening"
        }       
    }

}
