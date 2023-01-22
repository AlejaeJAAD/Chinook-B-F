import * as dotenv from 'dotenv';
dotenv.config();
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.LOCALHOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

console.log(`Successfully connected to the database`);

export { connection }
