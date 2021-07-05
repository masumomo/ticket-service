import express from "express";
import 'express-async-errors';
import { json } from "body-parser";
import cookieSession from "cookie-session";


import { createTicketRouter } from "./routes/new";
import { indexTicketRouter } from "./routes/index";
import { showTicketRouter } from "./routes/show";
import { updateTicketRouter } from "./routes/update";
import { errorHandler } from '@masumomomo/ticket-common';
import { NotFoundError } from '@masumomomo/ticket-common';

const app = express();
app.set("trust proxy", true);
app.use(json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== "test" }));

app.use(indexTicketRouter);
app.use(showTicketRouter);
app.use(createTicketRouter);
app.use(updateTicketRouter);

app.all("*", (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
