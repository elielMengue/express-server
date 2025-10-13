import type { Request, Response } from "express";
import express from "express";
import healthRoutes from "./features/health/health.route";
import usersRoutes from "./features/users/users.routes";
import commentsRoute from "./features/comments/comments.route"
import demandesRoute  from './features/demandes/demandes.route'

// creer le serveur express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (_: Request, res: Response) => {
	res.json({
		name: "Session Backend",
		version: "1.0.0",
	});
});

app.use("/health", healthRoutes);
app.use("/users", usersRoutes);

app.use("/comments", commentsRoute);
app.use("/demandes", demandesRoute);

export default app;