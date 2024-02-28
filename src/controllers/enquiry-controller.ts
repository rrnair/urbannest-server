/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { logger } from "../logger";
import { Enquiry, EnquiryResponse } from "../types/stack-types";
import { Route, Post, Body } from "tsoa";

/**
 * Controller handles enquiry from users that visited the site
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@Route("/enquiry")
export class EnquiryController {

    @Post("/post")
    public async post (@Body() enquiry: Enquiry): Promise<EnquiryResponse> {
        logger.info(`Received enquiry from ${enquiry}`);
        return {
            message: "We got your enquiry, will be reaching out to you soon!"
        }       
    }
}
