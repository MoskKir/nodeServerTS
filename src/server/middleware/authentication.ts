import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../db/user.model';

export default class AccessSecurity {
    public static async authenticationUser(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.header('Authorization')!.replace('Bearer ', '');
            const decoded:any = jwt.verify(token, 'mysecretword');
            const user = await User.findOne({ _id: decoded._id });

            if (!user) throw new Error('User not exist');

            req.headers.token = token; 
            next();
        } catch (error) {
            res.status(401).send({error: error.message})
        }
    } 
}