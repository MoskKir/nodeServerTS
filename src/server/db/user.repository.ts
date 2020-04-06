// Файл для настройки взаимодействия с базой данных
import lowDB from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import IUser from './user.interface';
import User from './user.model';
import constants from '../constants/server';

const db = lowDB(new FileSync(constants.srcDir + 'db.json'));

export default class UserRepository {
    public static async setDefaults() {
        await db.defaults({ user: [{ name: 'Mary', age: 21 }], count: 0 }).write();
    }
    public static getData() {
        const users = db.get('users');
        return users;
    }
    public static setData(data :IUser) {
        const users = db.get('users');
        console.log(users);
        // users.push(data).write();
    }
}