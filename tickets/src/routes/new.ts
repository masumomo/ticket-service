import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";
import { currentUser, requireAuth, ValidateRequest } from '@masumomomo/ticket-common';

const router = express.Router();

router.post(
    "/api/tickets",
    currentUser,
    requireAuth,
    [
        body("title").not().isEmpty().withMessage("Title is required"),
        body("price")
            .isFloat({ gt: 0 })
            .withMessage("Price must be greater than 0"),
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { title, price } = req.body;
        const ticket = Ticket.build({
            title,
            price,
            userId: req.currentUser!.id
        });
        await ticket.save();

        res.status(200).send(ticket);
    }
);

export { router as createTicketRouter };
