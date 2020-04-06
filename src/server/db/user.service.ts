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
}

