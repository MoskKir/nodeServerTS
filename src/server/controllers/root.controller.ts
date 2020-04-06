import { Router as ExpressRouter, Request, Response, NextFunction } from 'express';

export default class RootController {
    private static _router :ExpressRouter = ExpressRouter();

    private static getIndexPage(req :Request, res :Response, next :NextFunction) {
        // res.render('index', {title: 'Main Page', text: 'some text'});
        // res.render('This is index');
        res.send('it OK')
    }

    private static getLogin(req :Request, res :Response, next :NextFunction) {
        res.render('login');
    } 

    private static getAddUserPage(req :Request, res :Response, next :NextFunction) {
        res.render('addUser');
    } 

    public static routes(path :string = '/') {
        this._router.get(`${path}`, this.getIndexPage);
        this._router.get(`${path}login`, this.getLogin);
        this._router.get(`${path}add_user`, this.getAddUserPage);
        
        return this._router;
    }
}