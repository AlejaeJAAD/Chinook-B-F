import { connection } from '../db.js'
import fs from 'fs';

export async function executeScript(filePath) {
  console.log(filePath)
  try {
    // Read the SQL script file
    const sqlScript = fs.readFileSync(filePath).toString();
    const queries = sqlScript.split(';')

    for (const query of queries) {
      if (query.trim() !== '') {
          await connection.execute(query);
      }
    }
    console.log(`SQL Script ${filePath} executed successfully`);
  } catch (error) {
    console.log(`Error executing the script: ${error}`);
  } 
  // finally {
  //   // Close the connection
  //   if (connection) connection.end();
  // }
}