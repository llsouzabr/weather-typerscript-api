import './util/module-alias';
import { Server } from '@overnightjs/core';
import { Application } from 'express';
import bodyParser from 'body-parser';

import { ForeCastController } from '@src/controllers/forecast';
import * as database from '@src/database';
import { BeachesController } from '@src/controllers/beaches';
import { UsersController } from './controllers/users';

export class SetupServer extends Server {

    constructor(private port=3000) {
        super();
    }

    public async init(): Promise<void> {
        this.setupExpress();
        this.setupControllers();
        await this.databaseSetup();
    }

    public start(): void {
        this.app.listen(this.port, () => {
            console.info('Server linstening on port: ' + this.port)
        });
    }

    private setupExpress(): void {
        this.app.use(bodyParser.json());
    }

    private setupControllers(): void {
        const forecastController = new ForeCastController();
        const beachesController = new BeachesController();
        const usersController = new UsersController();
        this.addControllers([
            forecastController,
            beachesController,
            usersController
        ]);
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