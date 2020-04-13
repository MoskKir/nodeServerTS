import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ObjectSchema } from "@hapi/joi";

export default class Validation {
    public static login(schema :ObjectSchema) :RequestHandler {        
        return async (req :Request, res :Response, next :NextFunction) :Promise<void> => {
                        try {
                            await schema.validateAsync(req.body);
                            next();
                        } catch (error) {
                            res.status(400).send({error: error.message})
                        }
                    } 
    }
};