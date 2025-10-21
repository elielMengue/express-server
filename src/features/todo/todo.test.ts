import { describe, test, expect } from 'bun:test'
import request from 'supertest'
import app from '../../app/server';


describe('TODO', () =>{
    	test("should return 200", async () => {
		const response = await request(app).get("/todos");
		expect(response.status).toBe(200);
	});

    test("should return 200 when found", async () => {
		const todo = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		const response = await request(app).get(`/todos/${todo.body.id}`);
		expect(response.status).toBe(200);
	});

    	test("should return 200", async () => {
		const response = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		expect(response.status).toBe(200);
	});

    test("should return 200", async () => {
		const todo = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		const response = await request(app).put(`/todos/${todo.body.id}`).send({
			title: "Updated todo",
			description: "Updated description",
		});
		expect(response.status).toBe(200);
	});

    test("should return 200", async () => {
		const todo = await request(app).post("/todos").send({
			title: "Test todo",
			description: "Test description",
		});
		const response = await request(app).delete(`/todos/${todo.body.id}`);
		expect(response.status).toBe(204);
	});


})