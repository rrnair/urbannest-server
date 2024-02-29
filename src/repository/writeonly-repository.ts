/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */


/**
 * Write-only repositories implements this interface to provide read 
 * features from a database. This way the user accesses with
 * read and write could be separated
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
export interface WriteOnlyRepository<T> {

    /** Create an entity of instance T */
    create(item: T): Promise<T>;

    /** Update an entity of instance T */
    update(item: T): Promise<T>;

    /** delete an entity of instance T */
    delete(id: string): Promise<boolean>;
}