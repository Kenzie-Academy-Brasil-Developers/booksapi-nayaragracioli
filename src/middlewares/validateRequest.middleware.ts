import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";


interface IValidateRequest {
    params?: AnyZodObject;
    body?: AnyZodObject;
    query?: AnyZodObject;
}

export class ValidateRequest {
    static execute(schemas: IValidateRequest) {
        return async (req: Request, res: Response, next: NextFunction) => {

            if (schemas.params) {
                req.params = await schemas.params.parseAsync(req.params);
            }

            if (schemas.body) {
                req.body = await schemas.body.parseAsync(req.body);
            }

            if (schemas.query) {
                req.query = await schemas.query.parseAsync(req.query);
            }

            next();

        }
    }
}