import express, { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { User } from "../models/user";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { BadRequestError } from '../errors/bad-request-error';


const router = express.Router();

router.post(
    "/api/users/signup",
    [
        body("email").isEmail().withMessage("Email must be valid"),
        body("password")
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage("Password must be between 4 and 20 characters"),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        console.log('errors :>> ', errors);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }

        const { email, password } = req.body;

        console.log("Creating a user... :", email);
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError("Email in use");
        }
        const user = User.build({ email, password });
        await user.save();

        const userJwt = jsonwebtoken.sign({ id: user.id, email: user.email }, "asdf");
        req.session = { jwt: userJwt };
        res.status(200).send(user);
    }
);

export { router as signupRouter };
