import { createSchema, Type, typedModel, } from 'ts-mongoose';
import bcrypt from 'bcryptjs';

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
        required: false,
        minlength: 1,
        trim: true,
    }),
})

UserSchema.pre<any>('save', async function(next :any) {
    const user = this;
    if(user.isModified('password')) user.password = await bcrypt.hash(user.password, 8);
    next();
});


const User = typedModel('User', UserSchema);

export default User;