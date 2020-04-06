import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';
import User from '../db/user.model';
import UserRepository from '../db/user.repository';


export default class UserController {
    private static _router :ExpressRouter = ExpressRouter();

    private static async getAllUsers(req :Request, res :Response, next :NextFunction) {
        const users = await UserRepository.getData();
        res.send(users);
    }

    private static addNewUser(req :Request, res :Response, next :NextFunction) {
        if (req.body) {
            UserRepository.setData(new User(req.body));
        }
        res.redirect('/');
    }

    public static routes(path :string = '/') {
        this._router.get(`${path}`, this.getAllUsers);
        this._router.post(`${path}`, this.addNewUser);
        
        return this._router;
    }
}