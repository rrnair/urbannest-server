/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { Property } from "../types/stack-types";
import PropertyRepository from "../repository/property-repository";
import { singleton } from "tsyringe";
import { Datasource } from "../db/datasource";


/** 
 * Manage real estate properties from the database
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@singleton()
export default class PropertyService {

    private propertyRepository: PropertyRepository;

    constructor(datasource: Datasource) {
        this.propertyRepository = new PropertyRepository(datasource.getCollection<any>('property'));
    }

    public async getAll() : Promise<Property[]> {
        return this.propertyRepository.findAll();
    }

    public async getById(id: string): Promise<Property | null> {
       return this.propertyRepository.findOne(id);
    }

    public async create(property: Property): Promise<Property> {
        return this.propertyRepository.create(property);
    }

    public async update(property: Property): Promise<Property> {
        return this.propertyRepository.update(property);
    }

    public async delete(id: string): Promise<boolean> {
        return this.propertyRepository.delete(id);
    }
}