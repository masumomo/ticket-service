import request from "supertest";
import { app } from "../../app";
import { Ticket } from '../../models/ticket';

it("returns all ticket ", async () => {
    await Ticket.deleteMany({});

    let res = await request(app)
        .get("/api/tickets")
        .set("Cookie", global.signin())
        .expect(200);

    expect(res.body).toHaveLength(0);

    const expectedTickets = [{
        title: "brabrabra",
        price: 10
    }, {
        title: "brabrabra2",
        price: 30
    }
    ];
    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send(expectedTickets[0])
        .expect(200);

    await request(app)
        .post("/api/tickets")
        .set("Cookie", global.signin())
        .send(expectedTickets[1])
        .expect(200);

    res = await request(app)
        .get("/api/tickets")
        .set("Cookie", global.signin())
        .expect(200);

    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toEqual(
        expect.objectContaining(expectedTickets[0])
    );
    expect(res.body[1]).toEqual(
        expect.objectContaining(expectedTickets[1])
    );
});
