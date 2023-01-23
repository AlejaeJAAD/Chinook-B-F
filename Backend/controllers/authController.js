import { connection } from '../db.js'
import bcrypt, { hash } from 'bcrypt'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config();

const schemaRegister = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    isEmployee: Joi.boolean().invalid(false)
})

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

export const register = async (req, res) => {
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    try {
        const { email, password, isEmployee } = req.body;
        const [ existingUser ] = await connection.execute(`SELECT * FROM login WHERE email = ?`, [email]);
        if (existingUser.length > 0) {
            return res.status(409).send({ message: 'Email already in use' });
        }

        // Hash the provided password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await connection.query('INSERT INTO login SET ?', { email, password: hashedPassword, isEmployee });

        // Generate and return JWT token
        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).send({ token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export const login = async (req, res) => {
    const { error } = schemaLogin.validate(req.body)

    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }

    try {
        const { email, password } = req.body;
        const [ users ] = await connection.execute(`SELECT * FROM login WHERE email = ?`, [email]);
        
        if (users.length === 0) {
            return res.status(404).send({ message: 'User not found' });
        }

        const user = users[0]

        // Compare provided password to hashed password in the db
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid password' });
        }

        // Generate and return JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).send({ token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
