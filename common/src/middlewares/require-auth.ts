import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-autherize-error";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }
    next();
};
