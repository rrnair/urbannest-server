/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { injectable } from "tsyringe";
import { logger } from "../logger";
import { Enquiry } from "../types/stack-types";
import { Route, Post, Body } from "tsoa";
import { LeadService } from "../service/lead-service";

/**
 * Controller handles enquiry from users that visited the site
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@injectable()
@Route("/enquiry")
export class EnquiryController {
    
    /** Inject dependency */
    constructor(private leadService: LeadService) {}


    /**
     * Create and persist an enquiry for a property.
     * 
     * @param enquiry Enquiry to create
     * @returns Created enquiry
     */
    @Post("/")
    public async post (@Body() enquiry: Enquiry): Promise<Enquiry> {
        logger.info(`Creating a new lead for : ${enquiry.propertyCategory}`);
        enquiry.createdOn = new Date();
        return this.leadService.create(enquiry);
    }
}
