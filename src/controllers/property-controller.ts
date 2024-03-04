/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import {Controller, Get, Path, Route} from "tsoa";
import {Property, PropertyStatus, PropertyCategory} from "../types/stack-types";
import {logger} from "../logger";
import PropertyService from "../service/property-service";
import {injectable} from "tsyringe";

/**
 * Controller that handles property read/write
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@injectable()
@Route("/props")
export class PropertyController extends Controller {

    constructor(private propertyService: PropertyService) { super(); }


    /**
     * Find a property by its unique id
     * 
     * @param id Unique id of the property
     * @returns Property matching the specified id else undefined
     */
    @Get("/{id}")
    public async get(@Path() id: string): Promise<Property | null> {
        return this.propertyService.getById(id);
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

        // No idea about the status - return empty list
        return [];
    }

    /**
     * Get all available property details - across all property categories
     * 
     * @returns One or more properties
     */
    @Get("/")
    public async getAll(): Promise<Property[]> {
        logger.info("Fetching all properties ");
        return await this.propertyService.getAll();
    }
}
