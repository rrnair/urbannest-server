/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { Controller, Get, Path, Post, Route} from "tsoa";
import { Property, PropertyStatus, PropertyCategory } from "../types/stack-types";
import { logger } from "../logger";
import PropertyService from "../service/property-service";
import { injectable } from "tsyringe";

/**
 * Controller that handles property read/write
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@injectable()
@Route("/props")
export class PropertyListController extends Controller {

    constructor(private propertyService: PropertyService) { super(); }


    /**
     * Find a property by its unique id
     * 
     * @param id Unique id of the property
     * @returns Property matching the specified id else undefined
     */
    @Get("/{id}")
    public async get(@Path() id: string): Promise<Property | undefined> {
        const prop =  this.propertyService.getById(id);
        if (! prop) {
            return prop;
        }
        return undefined;
    }

    /**
     * Get all properties, filter by Property category and completion status.
     * 
     * @param category Property category - all or residential or commercial
     * @param status Property completion status - all or new or completed or upcoming
     * @returns One or more properties matching specified property category, incase no status is specified then all properties 
     * are returned
     */
    @Get("/:category/:status")
    public async getByFilter(category: PropertyCategory, status: PropertyStatus): Promise<Property[]> {
        
        // If the status is `all` then return all available properties
        if (category == PropertyCategory.All && status === PropertyStatus.All) {
            return this.getAll();
        }

        // Compute all conditions
        // If the category is `all` and the status is `all` then return all available properties
        if ((PropertyCategory.All === category || PropertyCategory.Residential === category 
                || PropertyCategory.Commerical === category) 
            && (PropertyStatus.All === status || PropertyStatus.Completed === status 
            || PropertyStatus.New === status || PropertyStatus.Upcoming === status)) {
            
                logger.info(`Property listing - category: ${category}, Status: ${status}`);
                return (await this.getAll()).filter(
                    p => (PropertyCategory.All == category || p.category === category) 
                            && (PropertyStatus.All === status || p.status == status));
        }

        // No idea about the status - return empty list
        return [];
    }

    /**
     * Get all available property details - across all property categories
     * 
     * @returns One or more properties
     */
    @Get("/all")
    public async getAll(): Promise<Property[]> {
        return this.propertyService.getAll();
    }
}
