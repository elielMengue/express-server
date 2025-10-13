import { describe, test, expect } from 'bun:test'
import request from 'supertest'
import app from '@/server'


describe('Comments API', () => {
  test('GET /comments should return a list of comments', async () => {
    const response = await request(app).get('/comments');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
    test('POST /comments/publish should create a new comment', async () => {
    const newComment = {
        title: "A Valid Title",
        message: "This is a valid comment message with more than 25 characters."
    };
    const response = await request(app)
      .post('/comments/publish')
      .send(newComment);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe(newComment.title);
    expect(response.body.message).toBe(newComment.message);
  });
    test('POST /comments/publish should return 400 for invalid comment', async () => {
    const invalidComment = {
        title: "Short",
        message: "Too short"
    };
    const response = await request(app)
      .post('/comments/publish')
      .send(invalidComment);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
