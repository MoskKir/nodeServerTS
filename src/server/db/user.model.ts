import IUser from './user.interface';

export default class User implements IUser {
    public name :string;
    public age :number;
    constructor( user :IUser ) {
        this.name = user.name;
        this.age = user.age;
    }
}