import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoMemoryServer: MongoMemoryServer;

beforeAll(async () => {
  mongoMemoryServer = await MongoMemoryServer.create();
  const uri = mongoMemoryServer.getUri();

  await mongoose.connect(uri);
});

beforeEach(async () => {
  const allCollections = await mongoose.connection.db.collections();

  allCollections.forEach(async (collection) => {
    await collection.deleteMany({});
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongoMemoryServer.stop();
});
