import { type Request, type Response, Router } from "express";
import { userService } from "./users.service";
import { z } from "zod";

const router = Router();

const UserSchema = z.object({
	email: z
		.string()
		.email()
		.refine((email) => email.length <= 255, {
			message: "Email must be at most 255 characters long",
		})
		.refine((email) => email.endsWith("@gmail.com"), {
			message: "Email must be a Gmail account",
		}),
	password: z.string().min(8),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	role: z.enum(["admin", "client", "technician"]).default("client"),
});

// list all users
router.post("/", async (req: Request, res: Response) => {
	const input = req.body; // requête utilisateur
	// validation
	const result = await UserSchema.safeParse(input);
	if (!result.success) {
		return res.status(400).json({ error: result.error });
	}
	const user = await userService.createUser(result.data);
	res.json(user);
});

// list all users
router.get("/", async (_: Request, res: Response) => {
	const users = await userService.listUsers();
	res.json({ users });
});


export default router;
