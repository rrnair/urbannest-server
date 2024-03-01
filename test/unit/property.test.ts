import "reflect-metadata";

import {MongoClient, Db} from "mongodb";
import {container} from "tsyringe";
import {PropertyController} from "../../src/controllers/property-controller";
import {AdminController} from "../../src/controllers/admin-controller";
import { Property, PropertyCategory, PropertyStatus } from "../../src/types/stack-types";

describe("Property details can be read/write from database", () => {

    let mongoClient: MongoClient;
    let db: Db;

    beforeAll(async () => {
        mongoClient = await MongoClient.connect(process.env.MONGO_URL || '', {});
        db = mongoClient.db();
        container.register(Db, {useValue: db});
    });

    afterAll(async () => {
        mongoClient.close();
    });

    it("I can read Property details from database", async () => {
        const propertyController = container.resolve(PropertyController);
        const adminController = container.resolve(AdminController);
        const property: Property = {
            name: 'Brigade Metropolis',
            title: 'Brigade Metropolis',
            builder: 'Brigade',
            category: PropertyCategory.Residential,
            status: PropertyStatus.Completed,
            completedOn: new Date(),
            listedOn: new Date(),
            shortDescription: 'In the midst of ITPL',
            tags: ['ITPL'],
            startedOn: new Date(),
            images: ['pic1', 'pic2'],
            contentPath: 'path/to/content.pdf',
            address: {
                location: 'Mahadevapura',
                city: 'Bangalore',
            }
        };
        
        const created = await adminController.create(property);

        expect(await propertyController.getAll()).toBe([created]);
        // expect(propertyController.get(created._id!)).resolves.toEqual(created);
        // expect(propertyController.getByFilter(
        //     PropertyCategory.All, PropertyStatus.All)).resolves.toBe([created]);

    });
});

