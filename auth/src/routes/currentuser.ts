import express, { Request, Response } from "express";
const router = express.Router();


router.get("/api/users/currentuser", (req: Request, res: Response) => {
    res.send("Hi there!");
});

export { router as currentUserRouter };
