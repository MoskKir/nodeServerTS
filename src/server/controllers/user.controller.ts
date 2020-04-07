import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';
import User from '../db/user.model';
import UserService from '../db/user.service';


export default class UserController {
    private static _router :ExpressRouter = ExpressRouter();

    private static async getAllUsers(req :Request, res :Response, next :NextFunction) {
        try {
            const users = await UserService.getAllUsers();
            res.send(users);  
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static addNewUser(req :Request, res :Response, next :NextFunction) {
        try {
            if (req.body) UserService.addUser(req.body);
            res.redirect('/api/users/');            
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async deleteUser(req :Request, res :Response) {
        try {
            if (req.body) UserService.deleteUser(req);
            res.redirect('/api/users/');
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async updateUser(req :Request, res :Response) {
        try {
            if (req.body) UserService.updateUser(req);
            res.redirect('/api/users/');
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async auth(req :Request, res :Response, next :NextFunction) {
        try {
            await UserService.auth(req);
            next();
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    public static routes(path :string = '/') {
        this._router.get(`${path}`, this.auth, this.getAllUsers);
        this._router.post(`${path}`, this.addNewUser);
        this._router.delete(`${path}`, this.deleteUser);
        this._router.put(`${path}`, this.updateUser);
        
        return this._router;
    }
}