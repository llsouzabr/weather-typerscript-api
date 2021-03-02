import './util/module-alias';
import { Server } from '@overnightjs/core'
import bodyParser from 'body-parser';
import { ForeCastController } from './controllers/forecast';
import { Application } from 'express';
import * as database from '@src/database';
import { BeachesController } from './controllers/beaches';


export class SetupServer extends Server {

    constructor(private port=3000) {
        super();
    }

    public init(): void {
        this.setupExpress();
        this.setupControllers();
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }

    private setupControllers(): void {
        const forecastController = new ForeCastController();
        const beachesController = new BeachesController();
        this.addControllers([forecastController, beachesController]);
    }

    private async databaseSetup(): Promise<void> {
        await database.connect();
      }

    public getApp(): Application {
        return this.app;
    }

    public async close(): Promise<void> {
        await database.close();
      }

}