import { describe, expect, test } from 'bun:test';
import request from 'supertest';
import app from '@/server';

describe('Health Route', () => {
  test('GET /health should return status 200 and { status: "ok" }', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: 'OK' });
  });
});