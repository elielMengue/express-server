import { describe, expect, test } from 'bun:test'
import request from 'supertest'
import app from '../../server'


describe('Demandes API', () => {
    test('GET /demandes - should return a list of demandes', async () => {
        const response =  await request(app).get('/demandes');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });
    test('POST /demandes/create - should create a new demande', async () => {
        const newDemande = {
            title: "Need help with my account",
            description: "I am unable to access my account since yesterday."
        };
        const response = await request(app).post('/demandes/create').send(newDemande);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', newDemande.title);
        expect(response.body).toHaveProperty('description', newDemande.description);
        expect(response.body).toHaveProperty('status', 'open');
    });

});