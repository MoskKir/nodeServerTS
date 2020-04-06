import { Router as ExpressRouter } from 'express';
import indexController from '../controllers/index.controller';

export default class Router {
    private static _router :ExpressRouter = ExpressRouter();

    public static get routes() {
        this._router.use('/', indexController.routes);
        return this._router;
    }
}