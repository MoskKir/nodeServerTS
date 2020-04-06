import express from 'express';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

import fileStore from 'session-file-store';

import Router from './router/router';

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import multer from 'multer';

import constants from './constants/server';


class App {
    _port :number;
    _app :express.Application;
    private static _instance :App;

    constructor(port :number = constants.port) {
        this._app = express();
        this._port = port;
        this._app.use(cors());
        this._app.use(express.static(constants.publicDir));
        this._app.set('views', path.join(constants.srcDir, 'views/'));

        this.setMiddlewares();

        this._app.use('/', Router.routes);

        this._app.use(this.logErrors);
        this._app.use(this.errorHandler);

        // this._app.use(this.setSession);
    }

    public static get Instance() :App {
        return this._instance || (this._instance = new this());
    }

    public init() {
        this._app.listen( this._port, () => console.log(`App listen on port: ${this._port}`) )
    }

    private logErrors(err :Error, req :Request, res :Response, next :NextFunction) {
        console.error(err.stack);
        next(err);
    }

    private errorHandler(err :Error, req :Request, res :Response, next :NextFunction) {
        res.status(500);
        res.send({error: err})
    }

    private setSession() {
        // const FileStore = fileStore(session);
    }

    private setMiddlewares() {
        this._app.use(cookieParser());
        this._app.use(bodyParser.text())
        this._app.use(bodyParser.urlencoded({ extended: true }))
        this._app.use(bodyParser.json())
        this._app.use(multer().any())
    }
}

const app = App.Instance;
app.init()