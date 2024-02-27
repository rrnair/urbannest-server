/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { randomUUID } from "crypto";
import {Get, Route} from "tsoa";
import { Property, PropertyStatus, PropertyCategory } from "../types/stack-types";
import { logger } from "../logger";

/**
 * Controller that handles property read/write
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@Route("/props")
export class PropertyListController {


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
        
        // Is this a valid status passed
        if ((PropertyCategory.All === category || PropertyCategory.Residential === category 
                || PropertyCategory.Commerical === category) 
            && (PropertyStatus.All === status || PropertyStatus.Completed === status 
            || PropertyStatus.New === status || PropertyStatus.Upcoming === status)) {
            
                logger.info(`category: ${category}, Status: ${status}`)
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

        return [{
            id: randomUUID(),
            name: 'Brigade Metropolis',
            title: 'In between ITPL',
            shortDescription: 'A 28 acre property',
            listedOn: new Date(),
            category: PropertyCategory.Residential,
            status: PropertyStatus.New,
            builder: 'Brigade',
            address: {
                city: 'Bangalore'
            }
        }, {
            id: randomUUID(),
            name: 'Brigade Metropolis',
            title: 'In between ITPL',
            shortDescription: 'A 28 acre property',
            listedOn: new Date(),
            category: PropertyCategory.Residential,
            status: PropertyStatus.Upcoming,
            builder: 'Brigade',
            address: {
                city: 'Bangalore'
            }
        }, {
            id: randomUUID(),
            name: 'Brigade Metropolis',
            title: 'In between ITPL',
            shortDescription: 'A 28 acre property',
            listedOn: new Date(),
            category: PropertyCategory.Residential,
            status: PropertyStatus.Completed,
            builder: 'Brigade',
            address: {
                city: 'Bangalore'
            }
        }, {
            id: randomUUID(),
            name: 'Brigade Metropolis',
            title: 'In between ITPL',
            shortDescription: 'A 28 acre property',
            listedOn: new Date(),
            category: PropertyCategory.Residential,
            status: PropertyStatus.Completed,
            builder: 'Brigade',
            address: {
                city: 'Bangalore'
            }
        }];
    }
}
