/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { Enquiry, EnquirySearchRequest } from "src/types/stack-types";
import { Datasource } from "../db/datasource";
import { LeadRepository } from "../repository/lead-repository";
import { singleton } from "tsyringe";

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
    private leadRepository: LeadRepository;

    /** Inject datasource  */
    constructor(datasource: Datasource) {
        this.leadRepository = new LeadRepository(datasource.getCollection<any>('leads'));
    }

    /** Find all leads */
    public async getAll() : Promise<Enquiry[]> {
        return this.leadRepository.findAll();
    }

    /** Find a lead by its id */
    public async getById(id: string): Promise<Enquiry | null> {
       return this.leadRepository.findOne(id);
    }

    /** Create a new  lead */
    public async create(property: Enquiry): Promise<Enquiry> {
        return this.leadRepository.create(property);
    }

    /** Update a lead */
    public async update(property: Enquiry): Promise<Enquiry> {
        return this.leadRepository.update(property);
    }

    /** Delete a lead */
    public async delete(id: string): Promise<boolean> {
        return this.leadRepository.delete(id);
    }

    /** Find a lead via mult-faceted search request pattern */
    public async find(request: EnquirySearchRequest): Promise<Enquiry[] | null> {    
        return this.leadRepository.find(request);
    }

    /** Find all leads created between specified dates */
    public async findByCreatedDateBetween(from: Date, to: Date): Promise<Enquiry[] | null> {
        return this.leadRepository.findByCreatedDateBetween(from, to);
    }
}