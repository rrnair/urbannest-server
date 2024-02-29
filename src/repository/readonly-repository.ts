/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */


/**
 * Read-only repositories implements this interface to provide read 
 * features from a database. This way the user accesses with
 * read and write could be separated
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
export interface ReadOnlyRepository<T> {
    
    /** Find all instances of type T from database  */
    findAll(): Promise<T[]>;

    /** Find one instance of type T from database  */
    findOne(id: string): Promise<T | null>;
}