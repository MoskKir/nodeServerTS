import { createSchema, Type, typedModel, } from 'ts-mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import { Schema } from 'mongoose';

const UserSchema = createSchema({
    name: Type.string({
        unique:true,
        required: true,
        trim: true
    }),
    age: Type.number({
        required: true,
    }),
    password: Type.string({
        required: true,
        minlength: 1,
        trim: true,
    }),
    pets: Type.array().of({
        type: Schema.Types.ObjectId,
        ref: 'Peets'
    })
});

UserSchema.pre<any>('save', async function(next :any) {
    const user = this;
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
    next();
});

UserSchema.methods.generateAuthToken = async function() {
    const token = jwt.encode({_id: this._id }, 'mysecretword');
    return token;
};

UserSchema.statics.findByCredentials = async function(login :string, password :string) {
    const user = await User.findOne({name: login});

    if(!user) throw new Error('Unable user');
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new Error('Unable to login');
    
    return user;
};

const User = typedModel('User', UserSchema);

export default User;