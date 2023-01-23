import { connection } from '../db.js'

export const getArtists = async (req, res) => {
    await connection.query('SELECT * FROM artist')
    .then(([rows, fields]) => {
        res.send(rows);
    })
    .catch(err => {
      console.log(err);
    });
}

export const createArtist = async (req, res) => {
    const { name } = req.body;

    try {
        const result = connection.query('INSERT INTO artist SET ?', { name });
        res.status(201).send({ message: 'Artist created successfully.', artist: { name } });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error creating artist" });
    }
}

export const updateArtist = async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;

    try {
        const result = await connection.query('UPDATE artist SET name = ? WHERE artistId = ?', [name, id]);
    if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Artist not found" });
    }
    res.status(200).send({ message: 'Artist updated successfully.' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating artist" });
    }
}

export const deleteArtist = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await connection.query('DELETE FROM artist WHERE artistId = ?', [id]);
    
    if (result.affectedRows === 0) {
        return res.status(404).send({ message: "Artist not found" });
    }
    res.status(200).send({ message: 'Artist deleted successfully.' });
    
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error deleting artist" });
    }
}

export const getArtistById = async (req, res) => {
    const id = req.params.id;

    try {
        const result = await connection.query('SELECT * FROM artist WHERE artistId = ?', [id]);
        if (result.length === 0) {
            return res.status(404).send({ message: 'Artist not found'})
        }
        res.status(200).send(
            result[0]
        )
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Error fetching artist'})
    }
}