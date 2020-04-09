import { createSchema, Type, typedModel, } from 'ts-mongoose';
import { Schema } from 'mongoose';

const PetsSchema = createSchema({
    pet: Type.string({
        unique:false,
        required: true,
        trim: true
    }),
    name: Type.string({
        unique:true,
        required: true,
        trim: true
    }),
    age: Type.number({
        required: true,
    }),
    userId: Type.array().of({
        type: Schema.Types.ObjectId,
        ref: 'User'
    })
});

const Pets = typedModel('Peets', PetsSchema);
export default Pets;