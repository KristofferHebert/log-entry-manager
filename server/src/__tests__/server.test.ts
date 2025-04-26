import request from 'supertest';
import { app } from '../server';
import { PrismaClient } from '@prisma/client';
import { CreateLogEntryDto, UpdateLogEntryDto } from '../types';
const prisma = new PrismaClient();

describe('Log Entry API', () => {
  beforeEach(async () => {
    await prisma.logEntry.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it('should create a new log entry', async () => {
    const logEntry: CreateLogEntryDto = {
      userName: 'Test User',
      description: 'Test Description',
      date: new Date().toISOString(),
      location: 'Test Location'
    };

    const response = await request(app)
      .post('/api/logs')
      .send(logEntry)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.userName).toBe(logEntry.userName);
    expect(response.body.description).toBe(logEntry.description);
    expect(response.body.location).toBe(logEntry.location);
  });

  it('should get all log entries', async () => {
    const logEntries: CreateLogEntryDto[] = [
      {
        userName: 'User One',
        description: 'First log entry',
        date: new Date().toISOString(),
        location: 'New York'
      },
      {
        userName: 'User Two',
        description: 'Second log entry',
        date: new Date().toISOString(),
        location: 'Los Angeles'
      },
      {
        userName: 'User Three',
        description: 'Third log entry',
        date: new Date().toISOString(),
        location: 'Chicago'
      }
    ];

    for (const entry of logEntries) {
      await prisma.logEntry.create({
        data: {
          ...entry,
          date: new Date(entry.date)
        }
      });
    }

    const response = await request(app)
      .get('/api/logs')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(logEntries.length);
    
    response.body.forEach((log: any, index: number) => {
      expect(log).toHaveProperty('id');
      expect(log.userName).toBe(logEntries[index].userName);
      expect(log.description).toBe(logEntries[index].description);
      expect(log.location).toBe(logEntries[index].location);
    });
  });

  it('should update a log entry', async () => {
    const logEntry: UpdateLogEntryDto = {
      userName: 'Test User',
      description: 'Test Description',
      date: new Date().toISOString(),
      location: 'Test Location'
    };

    const createdLog = await prisma.logEntry.create({
      data: {
        ...logEntry,
        date: new Date(logEntry.date)
      }
    });

    const updatedData = {
      userName: 'Updated User',
      description: 'Updated Description',
      date: new Date().toISOString(),
      location: 'Updated Location'
    };

    const response = await request(app)
      .put(`/api/logs/${createdLog.id}`)
      .send(updatedData)
      .expect(200);

    expect(response.body.id).toBe(createdLog.id);
    expect(response.body.userName).toBe(updatedData.userName);
    expect(response.body.description).toBe(updatedData.description);
    expect(response.body.location).toBe(updatedData.location);
  });
}); 