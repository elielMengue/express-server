import { Router, type Request, type Response } from "express";      
import { z } from "zod"
import { demandeService } from "./demandes.service";




const router = Router();

const demandeSchema = z.object({
    title: z.string().min(5),
    description: z.string().min(10)
})

router.get('/', (req: Request, res: Response) =>{});

router.post('/demandes/create', (req: Request, res: Response) =>{
    const demande = req.body;
    const result  = demandeSchema.safeParse(demande);

    if(!result.success){
        return res.status(400).json({ error: result.error});
    }

    const createdDemande = demandeService.createDemande(demande);
    res.json(createdDemande)
});

router.get('/demandes/user/:email', (req: Request, res: Response) =>{});

export default router;
