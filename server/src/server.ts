import express, { Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/task-routes';

const app = express();

app.use(express.json());

// CORS Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));

app.get('/', (_req: Request, res: Response) => {
  res.send('Server is running');
});

app.use('/tasks', taskRoutes);

export default app;
