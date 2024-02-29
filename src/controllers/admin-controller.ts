/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { logger } from "../logger";
import { Enquiry, EnquirySearchRequest, Property } from "../types/stack-types";
import { Route, Post, Body, Get, Path, Controller } from "tsoa";
import PropertyService from "../service/property-service";
import { injectable } from "tsyringe";
import { LeadService } from "../service/lead-service";



/**
 * Controller handles read/write of data with privileged access (logged in user)
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@injectable()
@Route("/admin")
export class AdminController extends Controller {

    /**
     * Constructor injects dependencies
     * 
     * @param propertyService Service instance that manages property
     * @param leadService Service that manages leads
     */
    constructor(
        private propertyService: PropertyService,
        private leadService: LeadService) { super(); }

    /**
     * Find all leads in the system.
     * 
     * @returns All of the leads available in the system
     */
    @Get("/enquiry")
    public async getAllEnquries(): Promise<Enquiry[]> {
        return this.leadService.getAll();
    }
    
    /**
     * Get leads that registered between a range of dates
     * 
     * @param from Date from 
     * @param to Date till
     * @returns One or more Enquiries that came in between the dates
     */
    @Get("/enqury/{from}/{to}")
    public async getEnquries(@Path() from: Date, @Path() to: Date): Promise<Enquiry[] | null> {
        logger.info(`Get all enquiries from ${from}, to ${to}`);
        return this.leadService.findByCreatedDateBetween(from, to);
    }

    /**
     * Add a new property to the system, this will get listed on the site
     * 
     * @param property A property instance to create
     * @returns Created property
     */
    @Post("/prop")
    public async create(@Body() property: Property): Promise<Property> {
        return this.propertyService.create(property);
    }

    /**
     * Get a lead by its unique id.
     * 
     * @param id Lead unique id
     * @returns Lead details if found else empty
     */
    @Get("/lead/{id}")
    public async get (@Path() id: string): Promise<Enquiry | null> {
        return this.leadService.getById(id);
    }


    /**
     * Get all the leads from the system.
     * 
     * @returns All the leads found in the system
     */
    @Get("/lead")
    public async getAll(): Promise<Enquiry[]> {
        return this.leadService.getAll();
    }


    /**
     * Get all the leads that are created in the system between a date range.
     * 
     * @returns All the leads found in the system
     */
    @Post("/lead")
    public async search(@Body() request: EnquirySearchRequest): Promise<Enquiry[] | null> {
        return this.leadService.find(request);
    }

}
