import {Schema, model} from "mongoose";
import {Enquiry, Property, PropertyCategory, PropertyStatus} from "../types/stack-types";

export const propertySchema = new Schema<Property>({
    
    /** A short name of the property - `Brigade Metropolis` */
    name: {type: String, required: true},

    /** A short address of the property */
    address: {
        /** Location of the property - Whitefile, Indirangar etc */
        location: String,

        /** City where the property is located */
        city: String,

        /** State where the property is located */
        state: String,

        /** Country where the property is located */
        country: String, 

        /** Pin code of the place */
        pin: Number
    },

    /** Display title - `A Windflower` */
    title: {type: String, required: true},

    /** Category of property - Residential, Commerical etc */
    category: {
        type: String, enum: [ PropertyCategory.Commerical, PropertyCategory.Residential ], 
        default: PropertyCategory.Residential, required: true
    },

    /** A short description may be of 255 chars **/
    shortDescription: String,

    /** Whats the status of the property - new/completed/upcoming */
    status: {
        type: String, enum: [ PropertyStatus.Completed, PropertyStatus.New, PropertyStatus.Upcoming ],
        default: PropertyStatus.New, required: true
    },

    /** When project is started */
    startedOn: Date,

    /** If completed then when it was compeleted */
    completedOn: Date,

    /** Any tags - Premium, Road Side etc */
    tags: [String],

    /** Any static images that can be displayed in the listing */
    images: [String],

    /** Detaled content - usually a PDF file location */
    contentPath: String,

    /** Builder name */
    builder: String
}, {timestamps: true});

export const enquirySchema = new Schema<Enquiry>({

    name: String,
    
    email: String,
    
    phone: String,
    
    message: String,
    
    builder: String,
    
    propertyId: String,
    
    propertyCategory: {
        type: String, enum: [ PropertyCategory.Commerical, PropertyCategory.Residential], 
        default: PropertyCategory.Residential
    }
}, {timestamps: true});

export const PropertyModel = model<Property>('property', propertySchema);

export const EnquiryModel = model<Enquiry>('enquiry', enquirySchema);