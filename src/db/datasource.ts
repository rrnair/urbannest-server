/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { Collection, Db, MongoClient } from "mongodb";

/**
 * A mongodb datasource wrapper class that initiates a DB connection and
 * helps in creating new collections.
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
export class Datasource {

    /** Monogdb client instance */
    private client: MongoClient;

    /** A database instance */
    private database:Db;

    /**
     * Initialize mongodb
     * 
     * @param uri Mongodb uri
     * @param dbName Database name to use
     */
    constructor(private uri: string, dbName: string) {
        this.client = new MongoClient(uri);
        this.database = this.client.db(dbName);
    }

    /**
     * Get a collection from the mongodb. You may use this collection to read/write
     * to the database.
     * 
     * @param collectionName Name of the collection to get
     * @returns A collection instance.
     */
    public getCollection<T extends Document>(collectionName: string): Collection<T> {
        return this.database.collection(collectionName);
    }
}