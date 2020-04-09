import User from './user.model';
import { Request } from 'express';

interface bodyUserInterface {
    name :string;
    age :number;
    password :string;
}

export default class UserService {
    public static async getAllUsers() {
        return await User.find({});
    }

    public static async addUser(body :bodyUserInterface) {
        const user = new User(body);
        await user.save();
        return user;
    }

    public static async deleteUser(id :number) {
        return await User.findByIdAndDelete(id);
    }

    public static async updateUser(id :Request, body :bodyUserInterface) {
        return await User.findByIdAndUpdate(id, body);
    }

    public static async auth(name :string, password :string) {
        const user = await User.findByCredentials(name, password);
        if (!user) throw new Error('User not found'); 
        const token = await user.generateAuthToken();
        
        return token;
    }
}

