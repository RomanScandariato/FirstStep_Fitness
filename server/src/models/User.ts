
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const {Schema, model} = mongoose;
const {hash, compare} = bcrypt;


const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        minLength: [2, 'Your username must be at least 2 characters in length']
    },
    email: {
        type:String,
        unique: true,
        required: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Your password must be at least 6 characters in length']
    },
    pets: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Note'
    }]
}, {
    toJSON: {
        transform(_, user) {
            delete user.password;
            delete user.__v;

            return user;
        }

    }
});

userSchema.pre('save', async function(next) {
    const user: any = this;

    if (user.isNew) {
            user.password = await hash(user.password, 10);
    }
    next();

});

userSchema.methods.validatePassword = async function(fromPassword: string) {
    return await compare(fromPassword, this.password);
}

const User = model('User', userSchema);



export default User;
