/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import {Property} from "../types/stack-types";
import {inject, singleton} from "tsyringe";
import {PropertyModel} from "../model/schema";

/** 
 * Manage real estate properties from the database
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@singleton()
export default class PropertyService {

    /** Read/write property details from/to database */
    constructor(@inject("PropertyModel") private propertyModel: typeof PropertyModel) { }

    /**
     * Get all Property details from the database
     * @returns One or more properties 
     */
    public async getAll() : Promise<Property[]> {
        return this.propertyModel.find();
    }

    /**
     * Find a property by its id
     * 
     * @param id Property identifier
     * @returns Property detail if found else null
     */
    public async getById(id: string): Promise<Property | null> {
       return this.propertyModel.findById(id);
    }

    /**
     * Create a property in database.
     * 
     * @param property Property to create
     * @returns Created property
     */
    public async create(property: Property): Promise<Property> {
        return this.propertyModel.create(property);
    }

    /**
     * Update a property in database.
     * 
     * @param property Property to update
     * @returns Updated property
     */
    public async update(property: Property): Promise<boolean | null> {
        
       return this.propertyModel.findOneAndUpdate(property);
    }

    /**
     * Delete a property in database.
     * 
     * @param property Property to delete
     * @returns True if deleted else false
     */
    public async delete(id: string): Promise<boolean | null> {
        return this.propertyModel.findByIdAndDelete(id);
    }
}