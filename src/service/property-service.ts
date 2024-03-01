/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import {Property} from "../types/stack-types";
import PropertyRepository from "../repository/property-repository";
import {singleton} from "tsyringe";


/** 
 * Manage real estate properties from the database
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@singleton()
export default class PropertyService {

    /** Read/write property details from/to database */
    constructor(private propertyRepository: PropertyRepository) { }

    /**
     * Get all Property details from the database
     * @returns One or more properties 
     */
    public async getAll() : Promise<Property[]> {
        return this.propertyRepository.findAll();
    }

    /**
     * Find a property by its id
     * 
     * @param id Property identifier
     * @returns Property detail if found else null
     */
    public async getById(id: string): Promise<Property | null> {
       return this.propertyRepository.findOne(id);
    }

    /**
     * Create a property in database.
     * 
     * @param property Property to create
     * @returns Created property
     */
    public async create(property: Property): Promise<Property> {
        return this.propertyRepository.create(property);
    }

    /**
     * Update a property in database.
     * 
     * @param property Property to update
     * @returns Updated property
     */
    public async update(property: Property): Promise<Property> {
        return this.propertyRepository.update(property);
    }

    /**
     * Delete a property in database.
     * 
     * @param property Property to delete
     * @returns True if deleted else false
     */
    public async delete(id: string): Promise<boolean> {
        return this.propertyRepository.delete(id);
    }
}