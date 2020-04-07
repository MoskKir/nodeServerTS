import User from './user.model';
import { Request } from 'express';

export default class UserService {
    public static async getAllUsers() {
        return await User.find({});
    }

    public static async addUser(req :Request) {
        const user = new User(req);
        await user.save();
        return user;
    }

    public static async deleteUser(req :Request) {
        const id = req.body._id;
        return await User.findByIdAndDelete(id);
    }

    public static async updateUser(req :Request) {
        const id = req.body._id;
        return await User.findByIdAndUpdate(id, req.body);
    }

    public static async auth(req :Request) {
        const name = req.body.name;
        const password = req.body.password;

        if (!name || !password) throw new Error('please log in');

        const user = await User.findByCredentials(name, password);
        
        const token = await user.generateAuthToken();
        
        return {user, token}
    }
}

