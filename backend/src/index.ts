import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './lib/prisma';
import { validateEnv } from './utils/validateEnv';

dotenv.config();

// Validar variables de entorno antes de arrancar
validateEnv();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint de healthcheck
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Probar conexión a la base de datos
app.get('/api/db-check', async (req, res) => {
  try {
    await prisma.$connect();
    res.status(200).json({ status: 'connected', message: 'Prisma connected to PostgreSQL' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: 'Prisma connection failed', error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
