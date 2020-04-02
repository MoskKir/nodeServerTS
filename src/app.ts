import express from 'express';
import { Request, Response, NextFunction } from 'express';
import constants from './constants/server';

class App {
    _port: number;
    _app: express.Application;
    private static _instance: App;

    constructor(port :number = constants.port) {
        this._app = express();
        this._port = port;
    }

    public static get Instance() :App {
        return this._instance || (this._instance = new this());
    }

    init() {
        this._app.listen( this._port, () => console.log(`App listen on port: ${this._port}`) )
    }
}
console.log('hello TS')
const app = App.Instance;
app.init()
// console.log(new App)