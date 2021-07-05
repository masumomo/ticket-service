import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
        .get(`/api/ticket/${id}`)
        .expect(404);
});

it('returns the ticket if the ticket is found', async () => {
    const expectedTicket = {
        title: "brabrabra",
        price: 10
    };
    const res = await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send(expectedTicket)
        .expect(200);

    await request(app)
        .get(`/api/ticket/${res.body.id}`)
        .expect(200);

    expect(res.body.title).toEqual(expectedTicket.title);
    expect(res.body.price).toEqual(expectedTicket.price);


});