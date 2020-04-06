import { Router as ExpressRouter } from 'express';
import RootController from './root.controller';
import UserController from './user.controller';

import { Urls } from '../constants/url';

export default class Router {
    private static _router :ExpressRouter = ExpressRouter();

    public static get routes() {
        this._router.use(`/${Urls.api}/${Urls.users}`, UserController.routes());
        this._router.use(Urls.main, RootController.routes());

        return this._router;
    }
}