/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import {Enquiry, EnquirySearchRequest} from "src/types/stack-types";
import {inject, singleton} from "tsyringe";
import { EnquiryModel } from "src/model/schema";

/**
 * The service manages leads in other words Enquiries. These are public
 * users that looks up a property expressed interest by filling up a form
 * in the site. We persist them into mongodb for initiating a marketing 
 * campaign.
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
@singleton()
export class LeadService {

    /** Repository instance that read/writes to database */
    constructor(@inject("EnquiryModel") private enquiryModel: typeof EnquiryModel) { }

    /** Find all leads */
    public async getAll() : Promise<Enquiry[]> {
        return this.enquiryModel.find();
    }

    /** Find a lead by its id */
    public async getById(id: string): Promise<Enquiry | null> {
       return this.enquiryModel.findById(id);
    }

    /** Create a new  lead */
    public async create(property: Enquiry): Promise<Enquiry> {
        return this.enquiryModel.create(property);
    }

    /** Update a lead */
    public async update(property: Enquiry): Promise<Enquiry | null> {
        return this.enquiryModel.findByIdAndUpdate(property._id);
    }

    /** Delete a lead */
    public async delete(id: string): Promise<boolean | null> {
        return this.enquiryModel.findByIdAndDelete(id);
    }

    /** Find a lead via mult-faceted search request pattern 
     * TODO: Create custom query in schema
    */
    public async find(request: EnquirySearchRequest): Promise<Enquiry[] | null> {    
        return this.enquiryModel.find(request);
    }

    /** Find all leads created between specified dates 
     * * TODO: Create custom query in schema
    */
    public async findByCreatedDateBetween(from: Date, to: Date): Promise<Enquiry[] | null> {
        return this.enquiryModel.find(from, to);
    }
}