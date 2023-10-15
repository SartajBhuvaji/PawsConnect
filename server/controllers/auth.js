import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try{
      const{
            firstName,
            lastName,
            email,
            password,
            location,
            rating,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            location,
            rating: 5,
        });
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);

    }catch(error){
        res.status(500).json({message: error.message});
    }
}


// time: 41:16