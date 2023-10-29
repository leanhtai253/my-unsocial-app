import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoMemoryServer: MongoMemoryServer;

beforeAll(async () => {
    mongoMemoryServer = await MongoMemoryServer.create();
    const uri = mongoMemoryServer.getUri();

    await mongoose.connect(uri);
})

afterEach(async () => {
    const allCollections = await mongoose.connection.db.collections();
    for (let collection of allCollections) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    await mongoose.connection.close();
    await mongoMemoryServer.stop()
;})