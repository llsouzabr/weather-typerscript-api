import { Controller, Post } from '@overnightjs/core';
import { Users } from '@src/models/users';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController{
    @Post('')
    public async create(req: Request, res: Response): Promise<void> {
        try {
            const user = new Users(req.body)
            const newUser = await user.save();
            res.status(201).send(newUser);
        } catch(error) {
            if(error instanceof mongoose.Error.ValidationError){
                res.status(422).send({ error: error.message });
            } else {
                res.status(500).send({ error: 'Internal Server Error' });
            };
            console.log(error)
        };
    };
};
