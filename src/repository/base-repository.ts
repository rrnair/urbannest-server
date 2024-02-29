/* Copyright (c) 2024 Ubran Nest or its affiliates. All rights reserved. */

import { Document } from "mongodb";
import { ReadOnlyRepository } from "./readonly-repository";
import { WriteOnlyRepository } from "./writeonly-repository";

/**
 * A base repository to keep this simple and let implementation class decide
 * which of the method to override.
 * 
 * @author Ratheesh Nair
 * @since 1.0
 */
export abstract class BaseRepository<T extends Document> implements WriteOnlyRepository<T>, ReadOnlyRepository<T> {

    async findAll(): Promise<T[]> {
        throw new Error("Method not implemented.");
    }

    async findOne(id: string): Promise<T | null> {
        throw new Error("Method not implemented.");
    }

    async create(item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async update(item: T): Promise<T> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}