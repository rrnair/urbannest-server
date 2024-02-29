/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */


/**
 * A response object for Ping request
 */
export interface PingResponse {
    /** An aribitrary ping message */
    message: string
}

/**
 * Type of property - Residential, Commerical etc.
 */
export enum PropertyCategory {
    All = 'all',

    Residential = 'residential',

    Commerical = 'commercial'
}

/**
 * Status of the property - new/completed/upcoming.
 */
export enum PropertyStatus {
    
    /** All is a special value to select all types of properties. Do not use this to mark a property status */
    All = 'all',

    /** New properties that are to be handled in the site */
    New = 'new',

    /** The property construction is completed */
    Completed = 'completed',

    /** Upcoming properties in the near future */
    Upcoming = 'upcoming'
}


/**
 * A definition of a property, the property can be a new, completed or upcoming property. These details
 * are listed on the site by its status classification i.e. new/complete/upcoming.
 */
export interface Property {
    
    /** An Unique Id of the property */
    _id?: string,

    /** A short name of the property - `Brigade Metropolis` */
    name: string,

    /** A short address of the property */
    address?: Address,

    /** Display title - `A Windflower` */
    title: string,

    /** Category of property - Residential, Commerical etc */
    category: PropertyCategory,

    /** A short description may be of 255 chars **/
    shortDescription: string,

    /** When its listed first in the site */
    listedOn: Date,

    /** Whats the status of the property - new/completed/upcoming */
    status: PropertyStatus,

    /** If completed then when it was compeleted */
    completedOn?: Date,

    /** Any tags - Premium, Road Side etc */
    tags?: string[],

    /** Any static images that can be displayed in the listing */
    images?: string[],

    /** Detaled content - usually a PDF file location */
    contentPath?: string,

    /** Builder name */
    builder: string,

}

/**
 * Address of a property
 */
export interface Address {

    /** Location of the property - Whitefile, Indirangar etc */
    location?: string,

    /** City where the property is located */
    city?: string,

    /** State where the property is located */
    state?: string,

    /** Country where the property is located */
    country?: string, 

    /** Pin code of the place */
    pin?: number
}


/** An enquiry from a website visitor */
export interface Enquiry {
    
    _id?: string,

    name: string,
    
    email: string,
    
    phone: string,
    
    createdOn?: Date,

    message?: string,
    
    builder?: string,
    
    propertyId?: string,
    
    propertyCategory?: PropertyCategory
}


export interface EnquirySearchRequest {
    builder?: string,

    propertyCategory?: PropertyCategory
}


export interface PropertySearchRequest {

    category: PropertyCategory,

    status: PropertyStatus
}