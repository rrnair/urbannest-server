/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { randomUUID } from "crypto";
import { logger } from "../logger";
import { Enquiry, Property, PropertyCategory, PropertyStatus } from "../types/stack-types";
import { Route, Post, Body, Get, Path } from "tsoa";




/**
 * Controller handles read/write of data with privileged access (logged in user)
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@Route("/admin")
export class AdminController {

    @Get("/enquries")
    public async getAllEnquries(): Promise<Enquiry[]> {
        logger.info(`Get all enquiries`);
        return [];
    }
    
    @Get("/enquries/{from}/{to}")
    public async getEnquries(@Path() from: Date, @Path() to: Date): Promise<Enquiry[]> {
        logger.info(`Get all enquiries from ${from}, to ${to}`);
        return [];
    }

    @Post("/property")
    public async setProperty(@Body() property: Property): Promise<void> {
        logger.info(`Adding a new Property : ${property}`);
    }

    @Get("/property/{pid}")
    public async getProperty(@Path() pid: string): Promise<Property> {
        logger.info(`Get a new Property : ${pid}`);
        return {
            id: randomUUID(),
            name: 'Prestige Lakefront',
            shortDescription: '',
            title: 'Lake front',
            category: PropertyCategory.Residential,
            status: PropertyStatus.New,
            listedOn: new Date(),
            builder: 'Prestige'
        };
    }


    @Get("/property")
    public async getAllProperties(): Promise<Property[]> {
        logger.info(`Get all properties`);
        return [];
    }
}
