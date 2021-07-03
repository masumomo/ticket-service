import express, { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

import { body } from "express-validator";
import { User } from "../models/user";
import { ValidateRequest } from '@masumomomo/ticket-common';
import { BadRequestError } from '@masumomomo/ticket-common';
import { Password } from "../services/password";
const router = express.Router();


router.post("/api/users/signin",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password").trim().notEmpty().withMessage("password must be supplied")
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError("Invalid credentials");
        }

        const passwordMatch = await Password.compare(existingUser.password, password);
        if (!passwordMatch) {
            throw new BadRequestError("Invalid credentials");
        }

        const userJwt = jsonwebtoken.sign({ id: existingUser.id, email: existingUser.email }, process.env.JWT_KEY!);
        req.session = { jwt: userJwt };
        res.status(200).send(existingUser);

    });

export { router as signinRouter };
