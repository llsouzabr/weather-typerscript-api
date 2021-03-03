import { Controller, Post } from '@overnightjs/core';
import { User } from '@src/models/users';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { BaseController } from '@src/controllers';

@Controller('users')
export class UsersController extends BaseController{
    @Post('')
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const user = new User(req.body)
            const newUser = await user.save();
            res.status(201).send(newUser);
        } catch(error) {
            this.sendCreateUpdateErrorResponse(res, error);
            // console.log(error)
        };
    };
};
