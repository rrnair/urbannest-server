/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import {singleton} from "tsyringe";
import {BaseRepository} from "./base-repository";
import {Enquiry, EnquirySearchRequest} from "../types/stack-types";
import {Collection, Db} from "mongodb";


/**
 * A mongodb repository instance that read/write to database. The repository
 * manages Enquiry collection
 */
@singleton()
export class LeadRepository extends BaseRepository<Enquiry> {

    private collection: Collection<Enquiry>;

    /** Inject Collection instance Enquiry */
    constructor(db: Db) {
        super();
        this.collection = db.collection<Enquiry>('enquiry');
    }   

    /**
     * Find leads using the specified multi-faceted search request.
     * 
     * @param request A multi-faceted search request
     * @returns One or more leads that matched the criteria or else null
     */
    public async find(request: EnquirySearchRequest): Promise<Enquiry[] | null> {
        
        let expression: object = {};
        
        if (request.builder) {
            expression = {builder: request.builder};
        }

        if(request.propertyCategory) {
            expression = {...expression, propertyCategory: request.propertyCategory};
        }

        return this.collection.find(expression).toArray();
    } 
    
    /**
     * Find all enquiries in the sytem.
     * 
     * @returns All enquiries we have in the system
     */
    override async findAll(): Promise<Enquiry[]> {
        return this.collection.find().toArray();
    }

    /**
     * Find all enquiries created between given date range.
     * 
     * @param from Created Date from
     * @param to Created Date to
     * @returns 
     */
    public async findByCreatedDateBetween(from: Date, to: Date): Promise<Enquiry[] | null> {
        return this.collection.find({createdOn: {$gte: from, $lt: to}}).toArray();
    }

    /**
     * Find a lead/enquiry by its unique id.
     * 
     * @param id Unique identifier
     * @returns An Enquiry instance if found or else null
     */
    override async findOne(id: string): Promise<Enquiry | null> {
        return this.collection.findOne({_id: id});
    }

    /**
     * Create a new enquiry/lead into the sytem.
     * 
     * @param item Item to create
     * @returns The newly created enquiry
     */
    override async create(item: Enquiry): Promise<Enquiry> {
        const {insertedId} = await this.collection.insertOne(item);    
        return {...item, _id: insertedId};
    }

    /**
     * Update an Enquiry instance.
     * 
     * @param item Item to update
     * @returns Updated instance
     */
    override async update(item: Enquiry): Promise<Enquiry> {
        await this.collection.updateOne({_id: item._id}, {$set: item});
        return item;
    }

    /**
     * Delete an enquiry/lead instance.
     * 
     * @param id Unique identifier to search and delete the instance
     * @returns True if an instance is deleted else false
     */
    override async delete(id: string): Promise<boolean> {
        const result = await this.collection.deleteOne({_id: id});
        return result.acknowledged && result.deletedCount > 0;
    }
}