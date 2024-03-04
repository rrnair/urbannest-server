
import mongoose from "mongoose";
import {logger} from "./logger";

export class Database {
    constructor(private mongodbUri: string, private mongodbName: string) {}

    public async init(): Promise<typeof mongoose> {
        
        logger.info(`Using mongodb : ${this.mongodbUri} - ${this.mongodbName}`);

        return mongoose.connect(`${this.mongodbUri}/${this.mongodbName}`);
    }
}
