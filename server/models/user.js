import mongoose from 'mongoose';
const baseUser = require('./baseUser');

const UserSchema = mongoose.Schema(
    {
        firstName: baseUser.schema.path('firstName'),
        lastName: baseUser.schema.path('lastName'),
        email: baseUser.schema.path('email'),
        password: baseUser.schema.path('password'),

        location: {
            type: String,
            required: false,
            minlength: 3,
            maxlength: 20
        },
        rating: {
            type: double,
            required: false,
            min: 0,
            max: 5
        },    
    },
    {timestamps: true}
);

const User = mongoose.model('User', UserSchema); 
export default User;
