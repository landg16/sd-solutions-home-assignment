import request from 'supertest';
import app from '../server';
import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(__dirname, '../data/tasks.json');

// Helper to reset the JSON file before each test
const resetTasks = async () => {
  await fs.writeFile(filePath, '[]', 'utf-8');
};

beforeEach(async () => {
  await resetTasks();
});

describe('Task API Endpoints', () => {
  it('should create a new task', async () => {
    const res = await request(app).post('/tasks').send({
      title: 'Test Task',
      description: 'Test Description',
      priority: 'medium',
      status: 'pending',
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');
  });

  it('should fail to create task with invalid data', async () => {
    const res = await request(app).post('/tasks').send({
      title: '', // Empty title
      priority: 'invalid_priority',
      status: 'pending',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Validation failed');
    expect(res.body.errors).toBeDefined();
  });

  it('should get all tasks', async () => {
    // Create a task first
    await request(app).post('/tasks').send({
      title: 'Task 1',
      priority: 'low',
      status: 'pending',
    });

    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
  });

  it('should get a task by ID', async () => {
    const createRes = await request(app).post('/tasks').send({
      title: 'Task to Find',
      priority: 'high',
      status: 'pending',
    });
    const taskId = createRes.body.id;

    const res = await request(app).get(`/tasks/${taskId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.id).toBe(taskId);
  });

  it('should update a task', async () => {
    const createRes = await request(app).post('/tasks').send({
      title: 'Task to Update',
      priority: 'low',
      status: 'pending',
    });
    const taskId = createRes.body.id;

    const res = await request(app).put(`/tasks/${taskId}`).send({
      status: 'completed',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('completed');
  });

  it('should fail to update task with invalid data', async () => {
    const createRes = await request(app).post('/tasks').send({
      title: 'Task to Update',
      priority: 'low',
      status: 'pending',
    });
    const taskId = createRes.body.id;

    const res = await request(app).put(`/tasks/${taskId}`).send({
      priority: 'invalid_priority',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Validation failed');
  });

  it('should delete a task', async () => {
    const createRes = await request(app).post('/tasks').send({
      title: 'Task to Delete',
      priority: 'low',
      status: 'pending',
    });
    const taskId = createRes.body.id;

    const res = await request(app).delete(`/tasks/${taskId}`);
    expect(res.statusCode).toEqual(204);

    const getRes = await request(app).get(`/tasks/${taskId}`);
    expect(getRes.statusCode).toEqual(404);
  });

  it('should filter tasks by status', async () => {
    await request(app).post('/tasks').send({
      title: 'Pending Task',
      priority: 'medium',
      status: 'pending',
    });
    await request(app).post('/tasks').send({
      title: 'Completed Task',
      priority: 'medium',
      status: 'completed',
    });

    const resPending = await request(app).get('/tasks?status=pending');
    expect(resPending.statusCode).toEqual(200);
    expect(resPending.body.length).toBe(1);
    expect(resPending.body[0].status).toBe('pending');

    const resCompleted = await request(app).get('/tasks?status=completed');
    console.log('resCompleted', resCompleted);
    expect(resCompleted.statusCode).toEqual(200);
    expect(resCompleted.body.length).toBe(1);
    expect(resCompleted.body[0].status).toBe('completed');
  });

  it('should return 400 for invalid status filter', async () => {
    const res = await request(app).get('/tasks?status=invalid_status');
    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('Validation failed');
  });
});
