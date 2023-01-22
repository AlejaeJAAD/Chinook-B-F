import { Router } from 'express'
import { 
    getArtists,
    createArtist,
    updateArtist,
    deleteArtist,
    getArtistById
} from '../controllers/artistController.js'

const router = Router()

router.get("/getArtists", getArtists)
router.post("/createArtist", createArtist)
router.put("/updateArtist/:id", updateArtist)
router.delete("/deleteArtist/:id", deleteArtist)
router.get("/getArtistById/:id", getArtistById)

export default router