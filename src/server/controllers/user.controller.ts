import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';
import User from '../db/user.model';
import UserService from '../db/user.service';
import AccessSecurity from '../middleware/authentication';


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

    private static async getUser(req :Request, res :Response, next :NextFunction) {
        try {
            const { id } = req.params
            const user = await UserService.getUser(id);

            if(user) await user.populate('pets').execPopulate();

            res.send(user);  
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

    private static addNewUserPet(req :Request, res :Response, next :NextFunction) {
        let result 
        try {
            if (req.body) result = UserService.addUserPet(req.body);
            // res.redirect('/api/users/');
            res.send(result);
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async deleteUser(req :Request, res :Response) {
        try {
            if (req.body) UserService.deleteUser(req.body._id);
            res.redirect('/api/users/');
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async updateUser(req :Request, res :Response) {
        try {
            if (req.body) UserService.updateUser(req.body._id, req.body);
            res.redirect('/api/users/');
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    private static async authorization(req :Request, res :Response, next :NextFunction) {
        try {
            const name = req.body.name;
            const password = req.body.password;
            const token = await UserService.auth(name, password);
            res.send(token)
            // next();
        } catch (error) {
            res.status(400).send({error: error.message});
        }
    }

    public static routes(path :string = '/') {
        this._router.post(`${path}login`, this.authorization, this.getAllUsers);
        this._router.get(`${path}`, AccessSecurity.authenticationUser, this.getAllUsers);
        this._router.post(`${path}`, this.addNewUser);
        this._router.delete(`${path}`, this.deleteUser);
        this._router.put(`${path}`, this.updateUser);
        this._router.post(`${path}addPet`, this.addNewUserPet);
        this._router.get(`${path}:id`, this.getUser); // this endpoin send user with him pets
        
        return this._router;
    }
}