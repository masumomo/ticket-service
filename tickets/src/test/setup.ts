import request from "supertest";
import jsonwebtoken from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[];
        }
    }
}
let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = "asdfasdf";

    mongo = new MongoMemoryServer();
    const mongoUrl = await mongo.getUri();
    await mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = () => {
    const userJwt = jsonwebtoken.sign({ id: new mongoose.Types.ObjectId().toHexString(), email: "test@test.com" }, process.env.JWT_KEY!);
    const sessionJson = JSON.stringify({ jwt: userJwt });
    const base64 = Buffer.from(sessionJson).toString('base64');
    return [`express:sess=${base64}`];
};
