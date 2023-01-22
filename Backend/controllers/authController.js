import { generateToken, verifyToken } from '../auth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Find the user with the matching email
    console.log(email, password)
}
