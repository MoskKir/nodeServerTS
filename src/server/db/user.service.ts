import User from './user.model';
import Pets from './pets.model';
import { Request } from 'express';

interface bodyUserInterface {
    name :string;
    age :number;
    password :string;
}

interface bodyPetsInterface {
    pet :string;
    name :string;
    age :number;
    userId :any;
}

export default class UserService {
    public static async getAllUsers() {
        return await User.find({});
    }

    public static async getUser(userId :string) {
        return await User.findById(userId);
    }

    public static async addUserPet(body :bodyPetsInterface) {
        const userId = body.userId;
        const pet :any = new Pets(body);
        const user = await User.findById(userId);

        console.log(pet)
        user?.pets?.push(pet);
        console.log(user)

        if (user) await user.save();
        
        await pet.save();
        return pet;
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

