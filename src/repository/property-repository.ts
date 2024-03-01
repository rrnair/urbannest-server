/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import {Collection, Db} from "mongodb";
import {Property} from "../types/stack-types";
import {BaseRepository} from "./base-repository";
import {singleton} from "tsyringe";

/**
 * A repository that manages properties.
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@singleton()
export default class PropertyRepository extends BaseRepository<Property> {
    
    private collection: Collection<Property>;

    /** Inject property datasource instance */
    constructor(db: Db) {
        super();
        this.collection = db.collection<Property>('property');
    }

    /**
     * Find all real estate properties in the system.
     * 
     * @returns One or more property instances
     */
    override async findAll(): Promise<Property[]> {
        return this.collection.find().toArray();
    }

    /**
     * Find a property by its unique id.
     * 
     * @param id Unique property identifier
     * @returns A property if found else null
     */
    override async findOne(id: string): Promise<Property | null> {
        return this.collection.findOne({_id: id});
    }

    /**
     * Create a property instance in the database.
     * 
     * @param item Item to create
     * @returns Created item
     */
    override async create(item: Property): Promise<Property> {
        const {insertedId} = await this.collection.insertOne(item);    
        return {...item, _id: insertedId};
    }

    /**
     * Update a property instance in the database.
     * 
     * @param item Item to update
     * @returns Updated item
     */
    override async update(item: Property): Promise<Property> {
        await this.collection.updateOne({_id: item._id}, {$set: item});
        return item;
    }

    /**
     * Delete a property instance from the database.
     * 
     * @param id Unique identifier to lookup and delete
     * @returns True if deleted else false
     */
    override async delete(id: string): Promise<boolean> {
        const result = await this.collection.deleteOne({_id: id});
        return result.acknowledged && result.deletedCount > 0;
    }
}