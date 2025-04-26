import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { CreateLogEntryDto, UpdateLogEntryDto } from './types';

export const app = express();
const prisma = new PrismaClient();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json({ limit: '1kb' }));

app.get('/api/logs', async (req, res) => {
  try {
    const logs = await prisma.logEntry.findMany({
      orderBy: { date: 'desc' }
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch log entries' });
  }
});

app.post('/api/logs', async (req, res) => {
  try {
    const data: CreateLogEntryDto = req.body;
    const log = await prisma.logEntry.create({
      data: {
        ...data,
        date: new Date(data.date)
      }
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create log entry' });
  }
});

app.put('/api/logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data: UpdateLogEntryDto = req.body;
    const log = await prisma.logEntry.update({
      where: { id: parseInt(id) },
      data: {
        ...data,
        date: data.date ? new Date(data.date) : undefined
      }
    });
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update log entry' });
  }
});

app.delete('/api/logs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.logEntry.delete({
      where: { id: parseInt(id) }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete log entry' });
  }
});

app.get('/api/logs/latest-user', async (req, res) => {
  try {
    const latestLog = await prisma.logEntry.findFirst({
      orderBy: { createdAt: 'desc' },
      select: { userName: true }
    });
    res.json({ userName: latestLog?.userName || '' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch latest user' });
  }
}); 