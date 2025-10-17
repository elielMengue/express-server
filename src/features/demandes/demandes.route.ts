import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { demandeService } from "./demandes.service";

const router = Router();

const demandeSchema = z.object({
	title: z.string().min(5),
	description: z.string().min(10),
	authorEmail: z.string().email().optional(),
});

router.get("/", async (_: Request, res: Response) => {
	const demandes = await demandeService.listDemandes();
	res.status(200).json(demandes);
});

router.post("/create", async (req: Request, res: Response) => {
	const result = demandeSchema.safeParse(req.body);

	if (!result.success) {
		return res.status(400).json({ error: result.error });
	}

	const createdDemande = await demandeService.createDemande(result.data);
	res.status(200).json(createdDemande);
});

router.get("/user/:email", async (req: Request, res: Response) => {
	const demandes = await demandeService.listDemandesByEmail(req.params.email);
	res.status(200).json(demandes);
});

export default router;
