import {application} from "../../src/index";
import {logger} from "../../src/logger";


describe('Property Routes works as expected', () => {

    //let database: Mongoose;

    beforeAll(async () => {
        //database = await setup()
        logger.info(`Started application ${application.name}`);
    });

    afterAll(async () => {
       // await tearDown(database);
       
    });

    it('I can read properties via API', async () => {
       
        
    });
});